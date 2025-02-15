import { createContext, useContext, useState, useEffect } from "react";
import { getBarang, addBarang, editBarang, deleteBarang, getLelang } from "../../../config/api"; // Sesuaikan dengan path untuk getBarang, addBarang, editBarang, deleteBarang, dan getLelang

const initialLelang = {
  barang: [],
  dataLelang: [], // Menambahkan state untuk data lelang
  handleGetBarang: () => {},
  handleAddBarang: () => {}, 
  handleEditBarang: () => {}, // Tambahkan fungsi untuk mengedit barang
  handleDeleteBarang: () => {}, // Tambahkan fungsi untuk menghapus barang
  handleGetLelang: () => {}, // Tambahkan fungsi untuk mendapatkan data lelang
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

  console.log("Data Lelang:", dataLelang);

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

  useEffect(() => {
    handleGetBarang();
    handleGetLelang(); // Panggil fungsi untuk mendapatkan data lelang saat komponen pertama kali di-mount
  }, []);

  return (
    <LelangContext.Provider value={{ barang, dataLelang, handleGetBarang, handleAddBarang, handleEditBarang, handleDeleteBarang, handleGetLelang }}>
      {children}
    </LelangContext.Provider>
  );
};

export { LelangProvider, useLelang };
export default LelangProvider;