import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "./components/Header";
import TableGenerate from "./components/TableGenerate";
import StrukModalGenerate from "./components/StrukModalGenerate";
import Search from "./components/Search";
import Swal from "sweetalert2";
import { getHistory } from "../../config/api"; // Import getHistory function
import { useAuth } from "../../Auth/AuthContext"; // Import useAuth

function GenerateLaporan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const printRef = useRef();
  const [showButton, setShowButton] = useState(true);
  const [reportData, setReportData] = useState([]);
  const { token } = useAuth(); // Get the token from useAuth

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory(token); // Pass the token to getHistory
        console.log("History response:", response); // Debugging line
        if (response.status === 201 && response.data.status === "success") {
          const { data } = response.data;
          setReportData(data.history);
        } else {
          throw new Error("Failed to fetch history data");
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal mendapatkan data history.",
        });
      }
    };

    fetchHistory();
  }, [token]); // Add token as a dependency

  const handleCetakClick = (row) => {
    setSelectedRow(row);
    if (row.nominal && row.nominal > 0) {
      setIsModalOpen(true);
    } else {
      Swal.fire({
        icon: "info",
        title: "Belum ada penawaran",
        text: "Belum ada penawaran pada lelang ini.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  };

  const handleDeleteReport = (index) => {
    const updatedReportData = [...reportData];
    updatedReportData.splice(index, 1);
    setReportData(updatedReportData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const generatePDF = async () => {
    setShowButton(false);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(printRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("struk_pembayaran.pdf");

    setShowButton(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <Header title="Generate Laporan" />

      <div className="grid grid-cols-12 gap-2 w-full pt-2">
        <div className="order-3 col-span-8 lg:col-span-4 lg:order-3">
          <Search />
        </div>
      </div>

      <TableGenerate
        handleCetakClick={handleCetakClick}
        reportData={reportData}
        handleDeleteReport={handleDeleteReport}
      />

      <StrukModalGenerate
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        generatePDF={generatePDF}
        selectedRow={selectedRow}
        showButton={showButton}
        printRef={printRef}
      />
    </>
  );
}

export default GenerateLaporan;