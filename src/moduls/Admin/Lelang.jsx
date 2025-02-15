import { useState, useEffect } from 'react';
import Search from "./components/Search";
import Header from "./components/Header";
import Card from "./components/Card";
import HistoryPenawaran from "./components/HistoryPenawaran";
import { useLelang } from "../Admin/components/AdminContext"; // Sesuaikan dengan path yang benar

const Lelang = () => {
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const { dataLelang, handleGetLelang } = useLelang();

  useEffect(() => {
    handleGetLelang(); // Pastikan data lelang diambil ketika halaman dimuat
  }, []);

  console.log("Data Lelang di Komponen:", dataLelang);

  const handleBukaLelang = () => {
    // Implementasi fungsi buka lelang
  };

  const handleTutupLelang = () => {
    // Implementasi fungsi tutup lelang
  };

  const handleBatal = () => {
    // Implementasi fungsi batal lelang
  };

  const handleHistory = () => {
    const historyData = [
      { name: 'Denis', nawar: '6.000.000.000' },
      { name: 'Adit', nawar: '7.000.000.000' },
      { name: 'CRABS', nawar: '50.000.000.000' }
    ];
    setSelectedHistory(historyData);
    setShowHistoryPopup(true);
  };

  const closeHistoryPopup = () => {
    setShowHistoryPopup(false);
  };

  return (
    <>
      <Header title="Lelang"/>
      <div className="grid grid-cols-12 gap-2 w-full pt-2">
        <div className="order-3 col-span-8 lg:col-span-4 lg:order-3">
          <Search />
        </div>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
        {Array.isArray(dataLelang) && dataLelang.map((lelang) => (
          <Card
            key={lelang.id_lelang}
            onBukaLelang={handleBukaLelang}
            onTutupLelang={handleTutupLelang}
            onBatal={handleBatal}
            onHistory={handleHistory}
            showMainButtons={false} // Menyembunyikan tombol buka lelang, batal lelang, dan histori
            title={lelang.nama_barang}
            description={lelang.deskripsi_barang}
            date={lelang.tgl_lelang}
            price={lelang.harga_awal}
            imageUrl={lelang.gambar} // URL gambar jika tersedia
          />
        ))}
      </section>

      {showHistoryPopup && (
        <HistoryPenawaran
          historyData={selectedHistory}
          closePopup={closeHistoryPopup}
        />
      )}
    </>
  );
};

export default Lelang;