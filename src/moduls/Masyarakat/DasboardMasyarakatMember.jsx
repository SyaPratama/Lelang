import { useState, useEffect } from 'react';
import Card from "../Admin/components/Card";
import Search from "../Admin/components/Search";
import HeaderMasyarakat from "./components/HeaderMasyarakat";
import HistoryPenawaran from "../Admin/components/HistoryPenawaran";
import PenawaranHarga from "./components/PenawaranHarga";
import { useAuth } from '../../Auth/AuthContext';
import { useLelang } from "../Admin/components/AdminContext"; // Sesuaikan dengan path yang benar

const MainLayoutsMasyarakatMember = () => {
  const { name, isLoggedin } = useAuth();
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const [showBidPopup, setShowBidPopup] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const { dataLelang, handleGetLelang } = useLelang();
  const [selectedLelangStatus, setSelectedLelangStatus] = useState("");

  useEffect(() => {
    handleGetLelang();
  }, []);

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

  const handleBid = (status) => {
    setSelectedLelangStatus(status);
    setShowBidPopup(true);
  };

  const closeBidPopup = () => {
    setShowBidPopup(false);
  };

  const submitBid = () => {
    // Handle bid submission logic here
    console.log("Bid submitted:", bidPrice);
    setShowBidPopup(false);
  };

  return (
    <>
      <section className="p-2 max-w-[900px] mx-auto">
        <div className="flex">
          <div className="flex justify-between w-full">
            <div className='w-225'>
              <Search />
            </div>
            <div className='w-10 flex justify-end'>
              <HeaderMasyarakat name={name} />
            </div>
          </div>
        </div>

        <div className="bg-blue-main text-white p-4 flex justify-between items-center mt-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <div>
              <h1 className="text-xl font-bold">Hallo, Selamat Datang!</h1>
              <p>Mau lelang? hubungi kami sekarang</p>
            </div>
          </div>
          <button className="bg-blue-dark text-blue-main p-2 rounded-lg shadow-md">Hubungi</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
          {Array.isArray(dataLelang) && dataLelang.map((lelang) => (
            <Card
              key={lelang.id_lelang}
              isMasyarakatPage={true}
              onHistory={handleHistory}
              onTawar={() => handleBid(lelang.status)} // Gunakan handleBid di sini
              isLoggedin={isLoggedin} // Tambahkan status login
              title={lelang.nama_barang}
              description={lelang.deskripsi_barang}
              date={lelang.tgl_lelang}
              price={lelang.harga_awal}
              imageUrl={lelang.gambar} // URL gambar jika tersedia
              status={lelang.status} // Tambahkan status lelang
            />
          ))}
        </div>
        {showHistoryPopup && (
          <HistoryPenawaran
            historyData={selectedHistory}
            closePopup={closeHistoryPopup}
          />
        )}
        {showBidPopup && (
          <PenawaranHarga
            bidPrice={bidPrice}
            setBidPrice={setBidPrice}
            closeBidPopup={closeBidPopup}
            submitBid={submitBid}
            lelangStatus={selectedLelangStatus} // Tambahkan status lelang
          />
        )}
      </section>
    </>
  );
};

export default MainLayoutsMasyarakatMember;