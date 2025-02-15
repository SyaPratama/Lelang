import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SearchBar from "../Admin/components/Search";
import Card from "../Admin/components/Card";
import HistoryPenawaran from "../Admin/components/HistoryPenawaran";
import { useState, useEffect } from "react";
import { useAuth } from "../../Auth/AuthContext"; // Sesuaikan dengan path yang benar
import { useLelang } from "../Admin/components/AdminContext"; // Sesuaikan dengan path yang benar

const DasboardMasyarakat = () => {
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const { isLoggedin } = useAuth(); // Mengambil status login
  const { dataLelang, handleGetLelang } = useLelang();
  const navigate = useNavigate();

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

  const handleLoginDulu = () => {
    if (!isLoggedin) {
      // Tampilkan notifikasi meminta pengguna untuk login terlebih dahulu
      Swal.fire({
        title: "Login Diperlukan",
        text: "Anda harus login terlebih dahulu untuk menawar barang.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          // Arahkan pengguna ke halaman login
          navigate("/login");
        }
      });
    } else {
      // Proses tawar barang jika pengguna sudah login
      console.log("Menawar barang");
    }
  };

  return (
    <>
      <section className="p-2 max-w-[900px] mx-auto">
        <div className="flex justify-end p-4">
          <SearchBar />
          {!isLoggedin && (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
          {Array.isArray(dataLelang) && dataLelang.map((lelang) => (
            <Card
              key={lelang.id_lelang}
              isMasyarakatPage={true}
              onHistory={handleHistory}
              handleLoginDulu={handleLoginDulu} // Gunakan handleLoginDulu di sini
              isLoggedin={isLoggedin} // Tambahkan status login
              onTawar={() => console.log("Menawar barang")} // Tambahkan handler tawar
              title={lelang.nama_barang}
              description={lelang.deskripsi_barang}
              date={lelang.tgl_lelang}
              price={lelang.harga_awal}
              imageUrl={lelang.gambar} // URL gambar jika tersedia
            />
          ))}
        </div>
        {showHistoryPopup && (
          <HistoryPenawaran
            historyData={selectedHistory}
            closePopup={closeHistoryPopup}
          />
        )}
      </section>
    </>
  );
};

export default DasboardMasyarakat;