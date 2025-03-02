/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth/AuthContext"; // Sesuaikan dengan path yang benar
import { getUser } from "../../../config/api";
import { useLelang } from "./AdminContext";

const Logout = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { doLogout, role, name } = useAuth();
  const { users } = useLelang() 
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    doLogout();
    if (role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex items-center w-25">
        <div className="flex items-center ms-3 ml-auto">
          <div>
            <button
              type="button"
              className="flex justify-center items-center text-sm bg-blue-dark rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-white-500"
              aria-expanded={isUserMenuOpen}
              onClick={toggleUserMenu}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>
          </div>

          {isUserMenuOpen && (
            <div className="relative">
              <div
                className="absolute right-0 z-60 my-6 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-white dark:divide-gray-600"
                id="dropdown-user"
              >
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-900">{name}</p> {/* Menampilkan nama pengguna */}
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-900">
                    
                  </p>
                </div>
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm  text-white bg-[#005f8f] hover:bg-[#00476d]"

                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Logout;
