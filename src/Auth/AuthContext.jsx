import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { handleLogin, handleLoginAdmin } from "../config/api";
import { getToken, removeToken, saveToken } from "../helpers/LocalStorage";

const initialAuthState = {
  isLoggedin: false,
  authority: "",
  name: "",
  doLogin: () => {},
  doLoginAdmin: () => {},
  doLogout: () => {},
  changeAuthority: () => {},
}

// buat context
const AuthContext = createContext(initialAuthState)

// buat custom hook
const useAuth = () => {
  return useContext(AuthContext)
}

// buat provider
const AuthProvider = ({ children }) => {
  const [authority, setAuthority] = useState("")
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(""); // "Admin" atau "User"
  const [name, setName] = useState("");

  // Simpan role ke localStorage
  const saveRole = (role) => localStorage.setItem("role", role);
  const getRole = () => localStorage.getItem("role") ?? null;
  const removeRole = () => localStorage.removeItem("role");

  // Simpan username ke localStorage
  const saveUserName = (name) => localStorage.setItem("username", name);
  const getUserName = () => localStorage.getItem("username") ?? null;
  const removeUserName = () => localStorage.removeItem("username");

  //Authority
  const changeAuthority = (auth) => {
    setAuthority(auth)
  }

  // ✅ Fungsi Login untuk User
  const doLogin = async (username, password) => {
    if (isLoading) return false;
    setIsLoading(true);
  
    Swal.fire({
      title: "Loading...",
      text: "Sedang memproses login...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await handleLogin(username, password);
      const { data, message, status } = response.data;
  
      if (status !== "success") {
        throw new Error(message || "Login gagal!");
      }
  
      saveToken(data.token);
      saveUserName(username);
      saveRole("User");
  
      setIsLoggedin(true);
      setName(username); // Pastikan nilai name di-set dengan benar
      setRole("User");
  
      Swal.fire({
        title: "Berhasil!",
        text: `Selamat datang, ${username}!`,
        icon: "success",
      });
  
      return true; // Login berhasil
  
    } catch (error) {
      Swal.fire({
        title: "Login Gagal!",
        text: error.message || "Terjadi kesalahan!",
        icon: "error",
      });
  
      return false; // Login gagal
  
    } finally {
      setIsLoading(false);
    }
  };
  
  // ✅ Fungsi Login untuk Admin
  const doLoginAdmin = async (username, password) => {
    if (isLoading) return false;
    setIsLoading(true);

    Swal.fire({
      title: "Loading...",
      text: "Sedang memproses login...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await handleLoginAdmin(username, password);
      const { data, message, status } = response.data;

      if (status !== "success") {
        throw new Error(message || "Login gagal!");
      }

      saveToken(data.token);
      saveUserName(username);
      saveRole("Admin");

      setIsLoggedin(true);
      setName(username); // Pastikan name di-set dengan username yang benar
      setRole("Admin");

      Swal.fire({
        title: "Login Admin Berhasil!",
        text: `Selamat datang, ${username}!`,
        icon: "success",
      });

      return true; // Login berhasil

    } catch (error) {
      Swal.fire({
        title: "Login Gagal!",
        text: error.message || "Terjadi kesalahan!",
        icon: "error",
      });

      return false; // Login gagal
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fungsi Logout dengan Konfirmasi
  const doLogout = () => {
    Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        removeToken();
        removeRole();
        removeUserName();

        setIsLoggedin(false);
        setName("");
        setRole("");

        Swal.fire({
          title: "Logout Berhasil!",
          text: "Anda telah keluar dari sistem.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload(); // Refresh halaman setelah logout
        });
      }
    });
  };

  // ✅ Cek Status Login saat Halaman Dimuat Ulang
  useEffect(() => {
    const token = getToken();
    const Role = getRole();
    const Name = getUserName();

    if (token && Role) {
      setName(Name);
      setIsLoggedin(true);
      setRole(Role);
      setAuthority(Role);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedin,
      isLoading,
      role,
      authority,
      name,
      doLogin,
      doLoginAdmin,
      doLogout,
      getRole,
      getUserName,
      changeAuthority, }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth };
export default AuthProvider;
