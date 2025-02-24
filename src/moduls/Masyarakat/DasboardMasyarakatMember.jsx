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
  const { dataLelang, handleGetLelang, handleAddPenawaran, handleGetPenawaran, handleEditPenawaran, penawaran } = useLelang();
  const [selectedLelangStatus, setSelectedLelangStatus] = useState("");
  const [selectedLelangId, setSelectedLelangId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editPenawaranId, setEditPenawaranId] = useState(null);

  useEffect(() => {
    handleGetLelang();
  }, [dataLelang]);

  useEffect(() => {
    handleGetPenawaran();
  }, []);

  const handleHistory = (idLelang) => {
    const historyData = penawaran.filter(p => p.id_lelang === idLelang);
    setSelectedHistory(historyData);
    setShowHistoryPopup(true);
  };

  const closeHistoryPopup = () => {
    setShowHistoryPopup(false);
  };

  const handleBid = (id, status) => {
    setSelectedLelangId(id);
    setSelectedLelangStatus(status);
    setIsEdit(false);
    setShowBidPopup(true);
  };

  const handleEditBid = (id, status, penawaranId, nominal) => {
    setSelectedLelangId(id);
    setSelectedLelangStatus(status);
    setIsEdit(true);
    setEditPenawaranId(penawaranId);
    setBidPrice(nominal);
    setShowBidPopup(true);
  };

  const closeBidPopup = () => {
    setShowBidPopup(false);
    setBidPrice("");
    setEditPenawaranId(null);
  };

  const submitBid = async () => {
    try {
      if (isEdit) {
        await handleEditPenawaran(selectedLelangId, editPenawaranId, bidPrice, name);
      } else {
        await handleAddPenawaran(selectedLelangId, bidPrice);
      }
      console.log("Bid submitted:", bidPrice);
      setShowBidPopup(false);
    } catch (error) {
      console.error("Failed to submit bid:", error);
    }
  };

  const getHighestBid = (idLelang) => {
    const bids = penawaran.filter(p => p.id_lelang === idLelang);
    if (bids.length === 0) return null;
    return bids.reduce((prev, current) => (prev.nominal > current.nominal) ? prev : current);
  };

  const hasUserBid = (idLelang) => {
    return penawaran.some(p => p.id_lelang === idLelang && p.username === name);
  };

  const getUserBid = (idLelang) => {
    return penawaran.find(p => p.id_lelang === idLelang && p.username === name);
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
          {Array.isArray(dataLelang) && dataLelang.map((lelang) => {
            const userBid = getUserBid(lelang.id_lelang);
            return (
              <Card
                key={lelang.id_lelang}
                isMasyarakatPage={true}
                onHistory={() => handleHistory(lelang.id_lelang)}
                onTawar={() => handleBid(lelang.id_lelang, lelang.status)}
                onEditBid={() => handleEditBid(lelang.id_lelang, lelang.status, userBid.id_penawaran, userBid.nominal)}
                isLoggedin={isLoggedin}
                title={lelang.nama_barang}
                description={lelang.deskripsi_barang}
                date={lelang.tgl_lelang}
                price={lelang.harga_awal}
                imageUrl={lelang.foto}
                status={lelang.status}
                highestBid={getHighestBid(lelang.id_lelang)}
                hasBid={hasUserBid(lelang.id_lelang)}
              />
            );
          })}
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
            lelangStatus={selectedLelangStatus}
            isEdit={isEdit}
          />
        )}
      </section>
    </>
  );
};

export default MainLayoutsMasyarakatMember;