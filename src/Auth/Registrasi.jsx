import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleRegister } from "../config/api";

const Registrasi = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [telp, setTelp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      nama_lengkap: namaLengkap,
      username: username,
      password: password,
      telp: telp,
    };

    try {
      const response = await handleRegister(userData);

      if (response.status !== 200) {
        throw new Error('Registration failed');
      }

      alert('Registration successful!');
      navigate('/login'); // Arahkan ke halaman login setelah berhasil mendaftar
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up</h2>
          <p className="text-center text-gray-600 mb-6">Jadilah Bagian dari Kami!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Nama Lengkap</label>
              <input 
                type="text" 
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg" 
                placeholder="Masukkan Nama Lengkap" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg" 
                placeholder="Masukkan Username" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">No. Telephone</label>
              <input 
                type="text" 
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg" 
                placeholder="Masukkan Nomor Hp" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg" 
                placeholder="********" 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium">
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Sudah punya akun? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Registrasi;
