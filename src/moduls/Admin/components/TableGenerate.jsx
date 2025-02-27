import Swal from 'sweetalert2';

const TableGenerate = ({ handleCetakClick, reportData, handleDeleteReport }) => {
  const confirmDelete = (index) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak akan bisa mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteReport(index);
        Swal.fire(
          'Dihapus!',
          'Data telah dihapus.',
          'success'
        );
      }
    });
  };

  return (
    <div className="container mx-auto p-4 pl-0" style={{ overflowX: 'auto' }}>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Username</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Tanggal</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Status</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Nama Barang</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Harga Awal</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Nominal</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Telepon</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((row, index) => (
            row && (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{row.username}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(row.tgl_lelang).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.nama_barang}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.harga_awal}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.nominal}</td>
                <td className="py-2 px-4 border-b border-gray-200">{row.telp}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    className="bg-blue-main text-white py-1 px-2 rounded"
                    onClick={() => handleCetakClick(row)}
                  >
                    Cetak
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-2 rounded ml-2"
                    onClick={() => confirmDelete(index)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableGenerate;