import { useState, useEffect } from 'react';
import SearchBar from "./components/Search";
import Header from "./components/Header";
import Card from "./components/Card";
import HistoryPenawaran from "./components/HistoryPenawaran";
import DateRangeFilter from './components/DateRangeFilter'; // Import DateRangeFilter component
import PriceRangeFilter from './components/PriceRangeFilter'; // Import PriceRangeFilter component
import { useLelang } from "../Admin/components/AdminContext"; // Sesuaikan dengan path yang benar
import Swal from 'sweetalert2';

const Lelang = () => {
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const { dataLelang, handleGetLelang, handleDeleteLelang, handleUpdateLelangStatus, penawaran, handleGetPenawaran, handleGetHighestBid } = useLelang();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filterColumn, setFilterColumn] = useState("semuanya"); // State for selected filter column
  const [statusFilter, setStatusFilter] = useState("semua"); // State for status filter
  const [sortOption, setSortOption] = useState(""); // State for sort option
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [priceRange, setPriceRange] = useState({ min: "", max: "" }); // State for price range
  const [priceFilterType, setPriceFilterType] = useState("harga_awal"); // State for price filter type
  const [showDateRangePopup, setShowDateRangePopup] = useState(false); // State for showing date range popup
  const [showPriceRangePopup, setShowPriceRangePopup] = useState(false); // State for showing price range popup

  useEffect(() => {
    handleGetLelang();
    handleGetPenawaran();
  }, []);

  console.log("Data Lelang di Komponen:", dataLelang);

  const handleUpdateStatus = async (id_lelang, id_barang, status) => {
    await handleUpdateLelangStatus({ id_lelang, id_barang, status });
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
    if (bids.length === 0) return { nominal: 0 };
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
        await handleUpdateLelangStatus({ id_lelang: lelang.id_lelang, id_barang: lelang.id_barang, status: "ditutup" });
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

  // Filter lelang data based on search query, date range, and price range
  const filteredLelang = dataLelang.filter(lelang => {
    const matchesSearchQuery = lelang.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lelang.deskripsi_barang.toLowerCase().includes(searchQuery.toLowerCase());

    const lelangDate = new Date(lelang.tanggal);
    const matchesDateRange = (!startDate || lelangDate >= new Date(startDate)) && (!endDate || lelangDate <= new Date(endDate));

    const highestBid = getHighestBid(lelang.id_lelang);
    const effectivePrice = priceFilterType === 'nominal' ? highestBid.nominal : lelang.harga_awal;
    const matchesPriceRange = (!priceRange.min || effectivePrice >= Number(priceRange.min)) &&
      (!priceRange.max || effectivePrice <= Number(priceRange.max));

    return matchesSearchQuery && matchesDateRange && matchesPriceRange;
  });

  // Sort lelang data based on sort option
  const sortedLelang = filteredLelang.sort((a, b) => {
    let highestBidA, highestBidB;
    switch (sortOption) {
      case "harga_awal_tertinggi":
        return b.harga_awal - a.harga_awal;
      case "harga_awal_terendah":
        return a.harga_awal - b.harga_awal;
      case "penawaran_tertinggi":
        highestBidA = getHighestBid(a.id_lelang);
        highestBidB = getHighestBid(b.id_lelang);
        return (highestBidB.nominal ? highestBidB.nominal : 0) - (highestBidA.nominal ? highestBidA.nominal : 0);
      case "penawaran_terendah":
        highestBidA = getHighestBid(a.id_lelang);
        highestBidB = getHighestBid(b.id_lelang);
        return (highestBidA.nominal ? highestBidA.nominal : 0) - (highestBidB.nominal ? highestBidB.nominal : 0);
      default:
        return 0;
    }
  });

  return (
    <>
      <Header title="Lelang" />
      <div className="grid grid-cols-12 gap-2 w-full pt-2">
        <div className="order-3 col-span-8 lg:col-span-4 lg:order-3">
          <SearchBar onSearch={setSearchQuery} /> {/* Implement SearchBar */}
        </div>
        <div className="order-4 col-span-4 lg:col-span-2 lg:order-4">
          <select
            onChange={(e) => setFilterColumn(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={filterColumn}
          >
            <option value="semuanya">Cari Semuanya</option>
            <option value="nama_barang">Cari Barang</option>
            <option value="tanggal">Cari Tanggal</option>
          </select>
        </div>
        <div className="order-5 col-span-4 lg:col-span-2 lg:order-5">
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={statusFilter}
          >
            <option value="semua">Status</option>
            <option value="dibuka">Buka</option>
            <option value="ditutup">Tutup</option>
          </select>
        </div>
        <div className="order-6 col-span-4 lg:col-span-2 lg:order-6">
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={sortOption}
          >
            <option value="">Urutkan Harga</option>
            <option value="harga_awal_tertinggi">Harga Tertinggi</option>
            <option value="harga_awal_terendah">Harga Terendah</option>
            <option value="penawaran_tertinggi">Penawaran Tertinggi</option>
            <option value="penawaran_terendah">Penawaran Terendah</option>
          </select>
        </div>
        <div className="order-7 col-span-2 lg:col-span-2 lg:order-7 flex justify-start items-start">
          <button
            className="bg-blue-main text-white p-2 rounded-lg"
            onClick={() => setShowDateRangePopup(true)}
          >
            Filter Tanggal
          </button>
        </div>
        <div className="order-8 col-span-2 lg:col-span-2 lg:order-8 flex justify-start items-start">
          <button
            className="bg-blue-main text-white p-2 rounded-lg"
            onClick={() => setShowPriceRangePopup(true)}
          >
            Filter Harga
          </button>
        </div>
      </div>

      {showDateRangePopup && (
        <DateRangeFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          closePopup={() => setShowDateRangePopup(false)}
        />
      )}

      {showPriceRangePopup && (
        <PriceRangeFilter
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          priceFilterType={priceFilterType}
          setPriceFilterType={setPriceFilterType}
          closePopup={() => setShowPriceRangePopup(false)}
        />
      )}

      <section className="pb-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
        {Array.isArray(sortedLelang) && sortedLelang.map((lelang) => (
          <Card
            key={lelang.id_lelang}
            onUpdateStatus={(status) => handleUpdateStatus(lelang.id_lelang, lelang.id_barang, status)}
            onBatal={() => handleBatal(lelang.id_lelang)}
            onHistory={() => handleHistory(lelang.id_lelang)}
            showMainButtons={false}
            title={lelang.nama_barang}
            description={lelang.deskripsi_barang}
            date={lelang.tanggal}
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