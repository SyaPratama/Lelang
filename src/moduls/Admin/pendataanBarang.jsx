import { useState, useEffect } from "react";
import Card from "./components/Card";
import Search from "./components/Search";
import Header from "./components/Header";
import FormPendataan from "./components/FormPendataan";
import { useLelang } from "../Admin/components/AdminContext"; // Sesuaikan dengan path yang benar

function PendataanBarang() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Tambahkan state untuk item yang dipilih
  const { barang, handleGetBarang, handleEditBarang, handleDeleteBarang } = useLelang();

  

  useEffect(() => {
    handleGetBarang();
  }, []);

  const handleDelete = async (id_barang) => {
    await handleDeleteBarang(id_barang);
  };

  const handleEdit = (id_barang) => {
    const item = barang.find((b) => b.id_barang === id_barang);
    setSelectedItem(item); // Set item yang dipilih ke state
    setIsModalOpen(true); // Buka modal form
  };

  const handleLelang = () => {
    alert("Lelang");
  };

  const handleModalOpen = () => {
    setSelectedItem(null); // Reset selected item saat menambah barang baru
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section>
        <Header title="Pendataan Barang" />
        <div className="grid grid-cols-12 gap-2 w-full pt-2">
          <div className="order-3 col-span-8 lg:col-span-4 lg:order-3">
            <Search />
          </div>
          <div className="order-4 col-span-2 lg:col-span-2 lg:order-4 flex justify-start items-start">
            <button onClick={handleModalOpen} className="bg-blue-600 text-amber-50 py-2 px-2 rounded-lg">
              Tambah
            </button>
          </div>
        </div>

        <div className="pt-1 d-flex justify-start"></div>
        <h1>List Item</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {Array.isArray(barang) && barang.map((item) => (
            <Card
              key={item.id_barang}
              onDelete={() => handleDelete(item.id_barang)}
              onEdit={() => handleEdit(item.id_barang)}
              onLelang={handleLelang}
              showMainButtons={true} // Menampilkan tombol edit, hapus, tambah
              title={item.nama_barang}
              description={item.deskripsi_barang}
              price={item.harga_awal}
              date={item.tanggal}
              imageUrl={item.gambar} // Tambahkan URL gambar jika tersedia
            />
          ))}
        </section>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md mx-auto relative">
            <button onClick={handleModalClose} className="absolute top-2 right-2 text-gray-600 text-4xl">
              &times;
            </button>
            <FormPendataan handleClose={handleModalClose} selectedItem={selectedItem} />
          </div>
        </div>
      )}
    </>
  );
}

export default PendataanBarang;
