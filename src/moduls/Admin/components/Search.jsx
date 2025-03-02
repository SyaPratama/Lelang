import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex items-center bg-blue-main border-1 bg-white border-gray-300 rounded-lg pl-2 h-[40px] w-full">
      <Search className="text-white w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder="Cari..."
        className="w-full text-gray-700 bg-white outline-none h-10 border-1 border-gray-200   rounded-r-lg"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;