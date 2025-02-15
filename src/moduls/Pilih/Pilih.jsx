import { Link } from "react-router-dom";

const Pilih = () => {
  return (
    <>
      <div className="flex flex-col space-y-4">  {/* Menggunakan kelas Tailwind CSS yang benar */}
        <Link to="/dasboard-masyarakat">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
            Sebagai Masyarakat
          </button>
        </Link>
        <Link to="/dasboard-admin">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
            Sebagai Admin
          </button>
        </Link>
        <Link to="/dasboard-petugas">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
            Sebagai Petugas
          </button>
        </Link>
        <Link to="/login">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </Link>
      </div>
    </>
  );
};

export default Pilih;
