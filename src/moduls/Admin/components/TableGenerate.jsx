const TableGenerate = ({ handleCetakClick }) => {
    const data = [
      {
        username: "Abu",
        nomorHp: "085693432984",
        namaBarang: "Mobil Ferrari",
        tanggal: "1 Januari 2025",
        penawaran: "10.000.000.000",
      },
    ];
  
    return (
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Username</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Nomor Hp</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Nama Barang</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Tanggal</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Penawaran</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{row.username}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.nomorHp}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.namaBarang}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.tanggal}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.penawaran}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                    onClick={() => handleCetakClick(row)}
                  >
                    Cetak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableGenerate;
  