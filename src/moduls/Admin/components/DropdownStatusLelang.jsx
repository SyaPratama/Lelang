import { useState, useEffect } from "react";

const DropdownStatusLelang = ({ onStatusChange, currentStatus }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(newStatus);
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-40">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center h-[41px] items-center w-full rounded-md pl-2 py-1 bg-none border-2 border-[#005f8f]  text-sm font-medium text-[#005f8f] hover:text-white hover:bg-[#005f8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
        >
          {status === "dibuka" ? "dibuka" : "ditutup"}
          <svg
            className=" mr-1 flex ml-1 h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414l-6.293 6.293a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {dropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-18 rounded-md shadow-lg  bg-white ring-1 ring-[#005f8f] ring-opacity-5 focus:outline-none "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleStatusChange("dibuka")}
              className="block p-1 w-full text-sm text-[#005f8f] hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Dibuka
            </button>
            <button
              onClick={() => handleStatusChange("ditutup")}
              className="block p-1 w-full text-sm text-[#005f8f] hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Ditutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownStatusLelang;
