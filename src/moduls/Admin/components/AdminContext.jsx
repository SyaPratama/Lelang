import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getBarang, addBarang, editBarang, deleteBarang, getLelang, addLelang, deleteLelang, updateLelangStatus, getUser } from "../../../config/api"; // Sesuaikan dengan path untuk getBarang, addBarang, editBarang, deleteBarang, dan getLelang

const initialLelang = {
  barang: [],
  dataLelang: [], // Menambahkan state untuk data lelang
  handleGetUser: () => {},
  handleGetBarang: () => {},
  handleAddBarang: () => {}, 
  handleEditBarang: () => {}, // Tambahkan fungsi untuk mengedit barang
  handleDeleteBarang: () => {}, // Tambahkan fungsi untuk menghapus barang
  handleGetLelang: () => {}, // Tambahkan fungsi untuk mendapatkan data lelang
  handleAddLelang: () => {}, // Tambahkan fungsi untuk menambah data lelang
  handleDeleteLelang: () => {}, // Tambahkan fungsi untuk menghapus data lelang
  handleUpdateLelangStatus: () => {}, // Tambahkan fungsi untuk memperbarui status lelang
};

// Buat context
const LelangContext = createContext(initialLelang);

// Buat custom hook
const useLelang = () => {
  return useContext(LelangContext);
};

// Buat provider
const LelangProvider = ({ children }) => {
  const [barang, setBarang] = useState([]);
  const [dataLelang, setDataLelang] = useState([]); // Tambahkan state untuk data lelang
  const [isAddingLelang, setIsAddingLelang] = useState(false);
  const [users, setUsers] = useState([])

  console.log("Data Lelang:", dataLelang);

  const handleGetUser = async () => {
    try {
      const response = await getUser();
      const users = response.data.data.dataUser; // Sesuaikan struktur data
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUsers([]); // Set users menjadi array kosong jika gagal
    }
  };

  const handleGetBarang = async () => {
    try {
      const response = await getBarang();
      const { data } = response.data;
      setBarang(data.barang); // Sesuaikan response dengan struktur data yang diambil
    } catch (error) {
      console.error("Failed to fetch barang:", error);
      setBarang([]); // Set barang sebagai array kosong jika gagal
    }
  };

  const handleAddBarang = async (barang) => {
    try {
      const response = await addBarang(barang);
      if (response.status === 200) {
        handleGetBarang(); // Perbarui daftar barang setelah berhasil menambah barang
      }
    } catch (error) {
      console.error("Failed to add barang:", error);
    }
  };

  const handleEditBarang = async (id_barang, barang) => {
    try {
      const response = await editBarang(id_barang, barang);
      if (response.status === 200) {
        handleGetBarang(); // Perbarui daftar barang setelah berhasil mengedit barang
      }
    } catch (error) {
      console.error("Failed to edit barang:", error);
    }
  };

  const handleDeleteBarang = async (id_barang) => {
    try {
      const response = await deleteBarang(id_barang);
      if (response.status === 200) {
        handleGetBarang(); // Perbarui daftar barang setelah berhasil menghapus barang
      }
    } catch (error) {
      console.error("Failed to delete barang:", error);
    }
  };

  const handleGetLelang = async () => {
    try {
      const responseLelang = await getLelang();
      const responseBarang = await getBarang();
      const lelangData = responseLelang.data.data.dataLelang;
      const barangData = responseBarang.data.data.barang;
      
      const combinedData = lelangData.map(lelang => {
        const barang = barangData.find(b => b.id_barang === lelang.id_barang);
        return { ...lelang, ...barang };
      });

      console.log("Combined Data:", combinedData);
      setDataLelang(combinedData);
    } catch (error) {
      console.error("Failed to fetch lelang data:", error);
      setDataLelang([]); // Set data lelang sebagai array kosong jika gagal
    }
  };

  const handleAddLelang = async (lelang) => {
    if (isAddingLelang) return; // Prevent spamming
    setIsAddingLelang(true);
    try {
      const response = await addLelang(lelang);
      if (response.status === 200 || response.status === 201) {
        await handleGetLelang(); // Perbarui daftar lelang setelah berhasil menambah lelang
        Swal.fire("Berhasil", "Barang berhasil ditambahkan ke lelang", "success");
      } else {
        Swal.fire("Gagal", "Gagal menambahkan barang ke lelang", "error");
      }
    } catch (error) {
      console.error("Failed to add lelang:", error);
      Swal.fire("Gagal", "Gagal menambahkan barang ke lelang", "error");
    } finally {
      setIsAddingLelang(false); // Reset the flag after the API call is finished
    }
  };

  const handleDeleteLelang = async (id_lelang) => {
    try {
      const response = await deleteLelang(id_lelang);
      if (response.status === 200) {
        await handleGetLelang(); // Perbarui daftar lelang setelah berhasil menghapus lelang
        Swal.fire("Berhasil", "Lelang berhasil dihapus", "success");
      } else {
        Swal.fire("Gagal", "Gagal menghapus lelang", "error");
      }
    } catch (error) {
      console.error("Failed to delete lelang:", error);
      Swal.fire("Gagal", "Gagal menghapus lelang", "error");
    }
  };

  const handleUpdateLelangStatus = async (id_lelang, tgl_lelang, status) => {
    try {
      const response = await updateLelangStatus(id_lelang, tgl_lelang, status);
      if (response.status === 200 || response.status === 201) {
        await handleGetLelang(); // Perbarui daftar lelang setelah berhasil memperbarui status lelang
        Swal.fire("Berhasil", "Status lelang berhasil diperbarui", "success");
      } else {
        Swal.fire("Gagal", "Gagal memperbarui status lelang", "error");
      }
    } catch (error) {
      console.error("Failed to update lelang status:", error);
      Swal.fire("Gagal", "Gagal memperbarui status lelang", "error");
    }
  };

  useEffect(() => {
    handleGetBarang();
    handleGetLelang();
    handleGetUser() // Panggil fungsi untuk mendapatkan data lelang saat komponen pertama kali di-mount
  }, []);

  return (
    <LelangContext.Provider value={{ barang, dataLelang, users, handleGetBarang, handleAddBarang, handleEditBarang, handleDeleteBarang, handleGetLelang, handleAddLelang, handleDeleteLelang, handleUpdateLelangStatus }}>
      {children}
    </LelangContext.Provider>
  );
};

export { LelangProvider, useLelang };
export default LelangProvider;