import { useState, useEffect } from 'react';
import Search from "./components/Search";
import Header from "./components/Header";
import Card from "./components/Card";
import HistoryPenawaran from "./components/HistoryPenawaran";
import { useLelang } from "../Admin/components/AdminContext"; // Sesuaikan dengan path yang benar
import Swal from 'sweetalert2';

const Lelang = () => {
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const { dataLelang, handleGetLelang, handleDeleteLelang, handleUpdateLelangStatus, penawaran, handleGetPenawaran, handleGetHighestBid } = useLelang();

  useEffect(() => {
    handleGetLelang();
    handleGetPenawaran();
  }, []);

  console.log("Data Lelang di Komponen:", dataLelang);

  const handleUpdateStatus = async (id_lelang, id_barang, tgl_lelang, status) => {
    await handleUpdateLelangStatus({ id_lelang, id_barang, tgl_lelang, status });
  };

  const handleBatal = async (id_lelang) => {
    const result = await Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      await handleDeleteLelang(id_lelang);
      Swal.fire(
        'Terhapus!',
        'Lelang telah dibatalkan.',
        'success'
      );
      handleGetLelang(); // Refresh lelang data after deleting
    }
  };

  const handleHistory = (idLelang) => {
    const historyData = penawaran.filter(p => p.id_lelang === idLelang);
    setSelectedHistory(historyData);
    setShowHistoryPopup(true);
  };

  const closeHistoryPopup = () => {
    setShowHistoryPopup(false);
  };

  const getHighestBid = (idLelang) => {
    const bids = penawaran.filter(p => p.id_lelang === idLelang);
    if (bids.length === 0) return null;
    return bids.reduce((prev, current) => (prev.nominal > current.nominal) ? prev : current);
  };

  const addHighestBidToReport = async (id_penawaran) => {
    const highestBid = await handleGetHighestBid(id_penawaran);
    console.log("Highest Bid Response: ", highestBid); // Tambahkan log ini untuk debugging
    if (highestBid && highestBid.dataPenawaran && highestBid.dataPenawaran.length > 0) {
      const reportData = JSON.parse(localStorage.getItem('reportData')) || [];
      reportData.push(highestBid.dataPenawaran[0]);
      localStorage.setItem('reportData', JSON.stringify(reportData));

      const lelang = dataLelang.find(l => l.id_lelang === highestBid.dataPenawaran[0].id_lelang);
      if (lelang && lelang.status === "dibuka") {
        await handleUpdateLelangStatus({ id_lelang: lelang.id_lelang, id_barang: lelang.id_barang, tgl_lelang: lelang.tgl_lelang, status: "ditutup" });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Tidak ada penawaran tertinggi',
        text: 'Penawaran tertinggi tidak ditemukan untuk lelang ini.',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      });
    }
    closeHistoryPopup();
  };

  return (
    <>
      <Header title="Lelang" />
      <div className="grid grid-cols-12 gap-2 w-full pt-2">
        <div className="order-3 col-span-8 lg:col-span-4 lg:order-3">
          <Search />
        </div>
      </div>
      <section className="pb-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
        {Array.isArray(dataLelang) && dataLelang.map((lelang) => (
          <Card
            key={lelang.id_lelang}
            onUpdateStatus={(status) => handleUpdateStatus(lelang.id_lelang, lelang.id_barang, lelang.tgl_lelang, status)}
            onBatal={() => handleBatal(lelang.id_lelang)}
            onHistory={() => handleHistory(lelang.id_lelang)}
            showMainButtons={false}
            title={lelang.nama_barang}
            description={lelang.deskripsi_barang}
            date={lelang.tgl_lelang}
            price={lelang.harga_awal}
            imageUrl={lelang.foto}
            status={lelang.status}
            highestBid={getHighestBid(lelang.id_lelang)}
          />
        ))}
      </section>

      {showHistoryPopup && (
        <HistoryPenawaran
          historyData={selectedHistory}
          closePopup={closeHistoryPopup}
          addHighestBidToReport={addHighestBidToReport}
          isAdmin={true}
        />
      )}
    </>
  );
};

export default Lelang;