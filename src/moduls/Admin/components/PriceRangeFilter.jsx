import { useState } from 'react';

const PriceRangeFilter = ({ priceRange, setPriceRange, priceFilterType, setPriceFilterType, closePopup }) => {
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPriceRange({ min: minPrice, max: maxPrice });
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
            <label className="mb-2">Filter Berdasarkan</label>
            <select
              className="p-2 border border-gray-300 rounded-lg mb-4"
              value={priceFilterType}
              onChange={(e) => setPriceFilterType(e.target.value)}
            >
              <option value="harga_awal">Harga Awal</option>
              <option value="nominal">Penawaran</option>
            </select>
            <label className="mb-2">Harga Minimum</label>
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-lg mb-4"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <label className="mb-2">Harga Maksimum</label>
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-lg mb-4"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded-lg"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
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

export default PriceRangeFilter;