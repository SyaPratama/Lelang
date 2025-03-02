
const DateRangeFilter = ({ startDate, setStartDate, endDate, setEndDate, closePopup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    closePopup();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md mx-auto relative">
        <button onClick={closePopup} className="absolute top-2 right-2 text-gray-600 text-4xl">
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-2">Tanggal Awal</label>
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-lg mb-4"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label className="mb-2">Tanggal Akhir</label>
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-lg mb-4"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                type="button"
                className="bg-blue-main text-white p-2 rounded-lg"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Reset
              </button>
              <button type="submit" className="bg-blue-main text-white p-2 rounded-lg">
                Apply Filter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateRangeFilter;