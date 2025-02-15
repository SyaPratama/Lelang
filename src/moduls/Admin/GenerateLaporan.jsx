import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "./components/Header";
import TableGenerate from "./components/TableGenerate";
import StrukModalGenerate from "./components/StrukModalGenerate";
import Search from "./components/Search";

function GenerateLaporan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const printRef = useRef();
  const [showButton, setShowButton] = useState(true);

  const handleCetakClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const generatePDF = async () => {
    setShowButton(false); // Hide the button before generating PDF
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms to hide button

    const canvas = await html2canvas(printRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("struk_pembayaran.pdf");

    setShowButton(true); // Show the button again after generating PDF
    setIsModalOpen(false); // Close the modal after generating the PDF
  };

  return (
    <>
      <Header title="Generate Laporan"/>
      
      <div className="grid grid-cols-12 gap-2 w-full pt-2">
          <div className="order-3 col-span-8 lg:col-span-4 lg:order-3">
            <Search />
          </div>
          <div className="order-4 col-span-2 lg:col-span-2 lg:order-4 flex justify-start items-start">
          </div>
        </div>

      <TableGenerate handleCetakClick={handleCetakClick} />

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
