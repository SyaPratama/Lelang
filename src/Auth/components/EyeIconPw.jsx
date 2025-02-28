import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EyeIcon = ({ isVisible, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="absolute right-3 bottom-[-10px] transform -translate-y-4/5">
      {isVisible ? <FaEye className="text-gray-700" size={24} /> : <FaEyeSlash className="text-gray-700" size={24} />}
    </button>
  );
};

export default EyeIcon;