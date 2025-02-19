import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginAdmin = () => {
  const { doLoginAdmin, changeAuthority } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username dan Password tidak boleh kosong!");
      return;
    }

    const loginSuccess = await doLoginAdmin(username, password);

    if (loginSuccess) {
      changeAuthority("Admin");
      navigate("/dasboard-admin"); // Arahkan ke dashboard admin setelah login berhasil
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-bg-blue-main">Admin Login</h2>
        <p className="text-center text-gray-600 mb-6">Masuk sebagai Admin</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Masukkan Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Masukkan password"
            />
          </div>
          <button
            onClick={handleClick}
            className="w-full bg-blue-main text-white py-2.5 rounded-lg font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginAdmin;
