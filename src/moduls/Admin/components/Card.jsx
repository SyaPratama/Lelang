import { Trash2, Pencil, Plus } from "lucide-react";

const Card = ({ onDelete, onEdit, onLelang, onBatal, onBukaLelang, onTutupLelang, onHistory, handleLoginDulu, showMainButtons, isMasyarakatPage, title, description, price, date, imageUrl, isLoggedin, onTawar }) => {
  return (
    <>
      <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <a href="#">
          <img className="rounded-t-lg" src={imageUrl} alt={title} />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
          </a>
          <p className="text-gray-900">{date ? new Date(date).toLocaleDateString() : 'Tanggal tidak tersedia'}</p>
          <p className="mb-3 font-normal text-gray-900">{description}</p>
          <h1 className="text-2xl text-gray-900">Rp{price ? price.toLocaleString() : 'Harga tidak tersedia'}</h1>
          <div className="flex justify-end gap-2">
            {showMainButtons ? (
              <>
                {/* Tombol Edit */}
                <button onClick={onEdit} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <Pencil className="w-4 h-4" />
                </button>
                {/* Tombol Delete */}
                <button onClick={onDelete} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
                {/* Tombol Add to Lelang */}
                <button onClick={onLelang} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">
                  <Plus className="w-4 h-4" />
                </button>
              </>
            ) : isMasyarakatPage ? (
              <>
                <button onClick={isLoggedin ? onTawar : handleLoginDulu} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300">
                  Tawar Harga
                </button>
                {/* Tombol Lihat Histori */}
                <button onClick={onHistory} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300">
                  Lihat Histori
                </button>
              </>
            ) : (
              <>
                {/* Tombol Buka Lelang */}
                <button onClick={onBukaLelang} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300">
                  Buka Lelang
                </button>
                {/* Tombol Tutup Lelang */}
                <button onClick={onTutupLelang} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300">
                  Tutup Lelang
                </button>
                {/* Tombol Batal Lelang */}
                <button onClick={onBatal} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300">
                  Batal Lelang
                </button>
                {/* Tombol Lihat Histori */}
                <button onClick={onHistory} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300">
                  Lihat Histori
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;