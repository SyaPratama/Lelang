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
  hideStatus,
  hasBid
}) => {
  const handleStatusChange = (status) => {
    onUpdateStatus(status);
  };

  return (
    <>
      <div className={`card ${status === "pending" ? "pending-animation" : ""} max-w-full bg-white border border-gray-200 rounded-lg shadow-sm relative w-100`}>
        <div className="absolute top-0 left-0 h-full w-1.5 bg-blue-main rounded-tl-lg rounded-bl-lg"></div>

        <a href="#" className="mx-auto">
          <img className="rounded-t-lg w-100 mx-auto pt-4 pl-1" src={`${https}/file/${imageUrl}`} alt={title} />
        </a>
        <div className="p-5 flex flex-col justify-between sm:flex-row">
          <div>
            {!hideStatus && (
              <div className={`px-3 w-[62px] py-1 rounded-full text-white text-xs ${status === 'dibuka' ? 'bg-green-500' : 'bg-red-500'}`}>
                {status === 'dibuka' ? 'Dibuka' : 'Ditutup'}
              </div>
            )}
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {title}
              </h5>
            </a>
            <p className="text-gray-900">
              {date ? new Date(date).toLocaleDateString() : "Tanggal tidak tersedia"}
            </p>
            <p className="mb-3 font-normal text-gray-900">{description}</p>
            <h1 className="text-2xl text-gray-900">
              Rp{price ? price.toLocaleString() : "Harga tidak tersedia"}
            </h1>
            {highestBid && (
              <p className="text-xl text-gray-600 mt-2">
                Penawaran Tertinggi: Rp{highestBid.nominal.toLocaleString()} oleh {highestBid.username}
              </p>
            )}
          </div>

          <div className="flex justify-center pl-3 items-center flex-col">
            <div className="flex gap-2">
              {showMainButtons ? (
                <>
                  <div className="flex justify-end flex-col">
                    <button
                      onClick={onLelang}
                      className="my-1 flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={onEdit}
                      className="my-1 flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onDelete}
                      className="my-1 flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : isMasyarakatPage ? (
                <>
                  <div className="flex flex-col">
                    <button
                      onClick={isLoggedin ? (hasBid ? onEditBid : onTawar) : handleLoginDulu}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium text-white ${hasBid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'} focus:ring-4 focus:outline-none ${hasBid ? 'focus:ring-blue-300' : 'focus:ring-orange-300'}`}
                    >
                      {hasBid ? 'Edit' : 'Tawar Harga'}
                    </button>
                    <button
                      onClick={onHistory}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300"
                    >
                      Lihat Histori
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <DropdownStatusLelang onStatusChange={handleStatusChange} currentStatus={status} />
                    <button
                      onClick={onBatal}
                      className="flex my-2 items-center gap-1 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 p-3"
                    >
                      Batal Lelang
                    </button>
                    <button
                      onClick={onHistory}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300"
                    >
                      Lihat Histori
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;