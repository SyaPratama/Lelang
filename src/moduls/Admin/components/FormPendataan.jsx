import { useState, useEffect } from "react";
import { useLelang } from "../components/AdminContext"; // Sesuaikan dengan path yang benar

const FormPendataan = ({ handleClose, selectedItem }) => {
  const { handleAddBarang, handleEditBarang } = useLelang();
  const [namaBarang, setNamaBarang] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [hargaPenawaran, setHargaPenawaran] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      setNamaBarang(selectedItem.nama_barang);
      setTanggal(selectedItem.tanggal.split("T")[0]); // Format tanggal
      setHargaPenawaran(selectedItem.harga_awal);
      setDeskripsi(selectedItem.deskripsi_barang);
    }
  }, [selectedItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBarang = {
      nama_barang: namaBarang,
      tanggal,
      harga_awal: hargaPenawaran,
      deskripsi_barang: deskripsi,
      // Tambahkan properti lain sesuai kebutuhan, seperti gambar
    };

    if (selectedItem) {
      await handleEditBarang(selectedItem.id_barang, newBarang);
    } else {
      await handleAddBarang(newBarang);
    }

    handleClose(); // Tutup form setelah berhasil menambah atau mengedit barang
  };

  return (
    <>
      <div className="mx-auto">
        <h2 className="text-center text-2xl font-bold mb-4">{selectedItem ? "Edit Barang" : "Tambah Barang"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gambar">
              Gambar
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="gambar"
                type="file"
                placeholder="Upload"
                onChange={(e) => setGambar(e.target.files[0])}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaBarang">
              Nama Barang
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="namaBarang"
              type="text"
              placeholder="Masukkan nama barang"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal">
              Tanggal
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tanggal"
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hargaPenawaran">
              Harga Penawaran
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hargaPenawaran"
              type="text"
              placeholder="Masukkan harga penawaran"
              value={hargaPenawaran}
              onChange={(e) => setHargaPenawaran(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">
              Deskripsi
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="deskripsi"
              placeholder="Masukkan deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-main bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {selectedItem ? "Simpan Perubahan" : "Tambah Barang"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormPendataan;
