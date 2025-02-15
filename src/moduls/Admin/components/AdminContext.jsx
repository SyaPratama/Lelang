import { createContext, useContext, useState, useEffect } from "react";
import { getBarang, addBarang, editBarang, deleteBarang } from "../../../config/api"; // Sesuaikan dengan path untuk getBarang, addBarang, editBarang, dan deleteBarang

const initialLelang = {
  barang: [],
  handleGetBarang: () => {},
  handleAddBarang: () => {}, 
  handleEditBarang: () => {}, // Tambahkan fungsi untuk mengedit barang
  handleDeleteBarang: () => {}, // Tambahkan fungsi untuk menghapus barang
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

  useEffect(() => {
    handleGetBarang();
  }, []);

  return (
    <LelangContext.Provider value={{ barang, handleGetBarang, handleAddBarang, handleEditBarang, handleDeleteBarang }}>
      {children}
    </LelangContext.Provider>
  );
};

export { LelangProvider, useLelang };
export default LelangProvider;
