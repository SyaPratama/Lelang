import { useState } from "react";
import { Trash2, Pencil, Plus } from "lucide-react";
import DropdownStatusLelang from "./DropDownStatusLelang";
import { https } from "../../../config/url";

const Card = ({
  onDelete,
  onEdit,
  onLelang,
  onBatal,
  onUpdateStatus,
  onHistory,
  handleLoginDulu,
  showMainButtons,
  isMasyarakatPage,
  title,
  description,
  price,
  date,
  imageUrl,
  isLoggedin,
  onTawar,
  onEditBid,
  status,
  highestBid,
  hideHighBid,
  hideStatus,
  hasBid,
}) => {
  const handleStatusChange = (status) => {
    onUpdateStatus(status);
  };

  // State for controlling 'see more' text
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300 group">
      {/* Container Gambar */}
      <div className="relative rounded-t-lg overflow-hidden">
        <div className="p-4 bg-white">
          <div className="overflow-hidden rounded-md">
            <img
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              src={`${https}/file/${imageUrl}`}
              alt={title}
            />
          </div>
        </div>
        {!hideStatus && (
          <span
            className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full text-white ${
              status === "dibuka" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status === "dibuka" ? "Dibuka" : "Ditutup"}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 pt-0">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">
          {date ? new Date(date).toLocaleDateString() : "Tanggal tidak tersedia"}
        </p>
        {/* Description with Expandable Logic */}
        <p className="text-gray-700 text-sm break-words">
          {isExpanded ? description : description.length > 100 ? `${description.slice(0, 100)}...` : description}
          {description.length > 100 && (
            <button
              onClick={toggleDescription}
              className="text-blue-600 ml-1 focus:outline-none"
            >
              {isExpanded ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
            </button>
          )}
        </p>
        <h4 className="text-xl font-bold text-gray-900">
          Rp{price ? price.toLocaleString() : "Harga tidak tersedia"}
        </h4>
        {/* High Bid Section */}
        {highestBid ? (
          <p className="text-sm text-gray-600">
            Penawaran Tertinggi:{" "}
            <span className="font-semibold">
              Rp{highestBid.nominal.toLocaleString()}
            </span>{" "}
            oleh {highestBid.username}
          </p>
        ) : !hideHighBid && (
          <p className="text-sm italic text-gray-500">Belum ada penawaran</p>
        )}

        {/* Button Section */}
        <div className="mt-4 flex flex-wrap justify-between items-center lg:flex-nowrap">
          {showMainButtons ? (
            <div className="flex flex-wrap gap-2 w-full lg:flex-nowrap">
              <button
                onClick={onLelang}
                className="flex-1 px-3 py-2 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={onEdit}
                className="flex-1 px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="flex-1 px-3 py-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : isMasyarakatPage ? (
            <div className="flex flex-wrap gap-2 w-full lg:flex-nowrap">
              <button
                onClick={
                  isLoggedin
                    ? hasBid
                      ? onEditBid
                      : onTawar
                    : handleLoginDulu
                }
                className={`flex-1 px-4 py-2 text-xs font-medium text-white rounded-lg focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 ${
                  hasBid
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
                    : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-300"
                }`}
              >
                {hasBid ? "Edit Penawaran" : "Tawar Harga"}
              </button>
              <button
                onClick={onHistory}
                className="flex-1 px-4 py-2 text-xs font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Lihat Histori
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 w-full lg:flex-nowrap">
              <DropdownStatusLelang
                onStatusChange={handleStatusChange}
                currentStatus={status}
              />
              <button
                onClick={onBatal}
                className="flex-1 px-4 py-2 text-xs font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Batal Lelang
              </button>
              <button
                onClick={onHistory}
                className="flex-1 px-4 py-2 text-xs font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Lihat Histori
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;