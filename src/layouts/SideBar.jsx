import { ClipboardList, Gavel, Home, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full">  
      {/* Sidebar */}
      {!isMobile && (
        <aside className={`fixed top-0 left-0 z-40 h-screen transition-all border-r border-gray-200 bg-blue-main text-white ${isSidebarOpen ? 'w-45' : 'w-20'}`}>
          <div className="flex items-center m-2">
            {/* Logo */}
            <img 
              src="/LogoLelang.png" 
              alt="Logo" 
              className="w-10 h-10 ml-4"
            />

            {/* Toggle Sidebar Button */}
            <button 
              onClick={toggleSidebar} 
              className={`p-[10px] w-[40px] h-[30px] flex items-center transition-all 
                          ${isSidebarOpen ? 'ml-[98px] bg-blue-main rounded-4xl border-2' : 'ml-[-2px] bg-blue-main border-2 rounded-full'}`}
            >
              <span className="font-bold pb-[4px] transition-all">
                {isSidebarOpen ? '<' : '>'}
              </span>
            </button>
          </div>

          <ul className="space-y-2 font-medium">
            <NavLink to="/dasboard-admin" className={({ isActive }) => `flex items-center py-4 m-2 px-2 rounded-sm ${isActive ? 'bg-blue-dark' : 'hover-side'}`}>
              <Home className={`w-7 h-7 flex ${isSidebarOpen ? 'ml-[10px]' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="ms-3">Dashboard</span>}
            </NavLink>
            <NavLink to="/pendataan-barang" className={({ isActive }) => `flex items-center py-4 m-2 px-2 rounded-sm ${isActive ? 'bg-blue-dark' : 'hover-side'}`}>
              <Package className={`w-7 h-7 flex ${isSidebarOpen ? 'ml-[10px]' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="ms-3">Barang</span>}
            </NavLink>
            <NavLink to="/generate-laporan" className={({ isActive }) => `flex items-center py-4 m-2 px-2 rounded-sm ${isActive ? 'bg-blue-dark' : 'hover-side'}`}>
              <ClipboardList className={`w-7 h-7 flex ${isSidebarOpen ? 'ml-[10px]' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="ms-3">Laporan</span>}
            </NavLink>
            <NavLink to="/buka-tutup-lelang" className={({ isActive }) => `flex items-center py-4 m-2 px-2 rounded-sm ${isActive ? 'bg-blue-dark' : 'hover-side'}`}>
              <Gavel
               className={`w-7 h-7 flex ${isSidebarOpen ? 'ml-[10px]' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="ms-3">Lelang</span>}
            </NavLink>
          </ul>
        </aside>
      )}

      {/* Bottom Navbar for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-blue-main border-t border-gray-200 flex justify-around items-center">
          <NavLink 
            to="/dasboard-admin" 
            className={({ isActive }) => `flex flex-col items-center text-white p-2 rounded-sm ${isActive ? 'text-blue-600 bg-blue-dark' : 'hover-side'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </NavLink>
          <NavLink 
            to="/pendataan-barang" 
            className={({ isActive }) => `flex flex-col items-center text-white p-2 rounded-sm ${isActive ? 'text-blue-600 bg-blue-dark' : 'hover-side'}`}
          >
            <Package className="w-5 h-5" />
            <span className="text-sm">Barang</span>
          </NavLink>
          <NavLink 
            to="/generate-laporan" 
            className={({ isActive }) => `flex flex-col items-center text-white p-2 rounded-sm ${isActive ? 'text-blue-600 bg-blue-dark' : 'hover-side'}`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-sm">Laporan</span>
          </NavLink>
          <NavLink 
            to="/buka-tutup-lelang" 
            className={({ isActive }) => `flex flex-col items-center text-white p-2 rounded-sm ${isActive ? 'text-blue-600 bg-blue-dark' : 'hover-side'}`}
          >
            <Gavel className="w-5 h-5" />
            <span className="text-sm">Lelang</span>
          </NavLink>
        </div>
      )}

      <div className={` transition-all ${!isMobile && isSidebarOpen ? 'sm:ml-44' : 'sm:ml-20'}`}>
        
        
      </div>
      <div className='w-full px-[7px] mb-[0px] sm:px-[30px] '>
        <Outlet />
        </div>
        
    </div>  
  );
};

export default SideBar;




