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
    <div className="flex">
      {/* Sidebar */}
      {!isMobile && (
        <aside className={`fixed top-0 left-0 z-40 h-screen transition-all border-r border-gray-200 bg-blue-main text-white ${isSidebarOpen ? 'w-55' : 'w-20'}`}>
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
                          ${isSidebarOpen ? 'ml-[138px] bg-blue-main rounded-4xl border-2' : 'ml-[-2px] bg-blue-main border-2 rounded-full'}`}
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
              {isSidebarOpen && <span className="ms-3">Pendataan Barang</span>}
            </NavLink>
            <NavLink to="/generate-laporan" className={({ isActive }) => `flex items-center py-4 m-2 px-2 rounded-sm ${isActive ? 'bg-blue-dark' : 'hover-side'}`}>
              <ClipboardList className={`w-7 h-7 flex ${isSidebarOpen ? 'ml-[10px]' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="ms-3">Generate Laporan</span>}
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

      <div className={` transition-all ${!isMobile && isSidebarOpen ? 'sm:ml-54' : 'sm:ml-20'}`}>
        
        
      </div>
      <div className='w-full px-[7px] pb-[0px] sm:px-[30px] '>
        <Outlet />
        </div>
    </div>  
  );
};

export default SideBar;




// import { useState } from 'react';
// import { Link, NavLink } from "react-router-dom";
// import { FileText, Package, ClipboardList, UserPlus } from 'lucide-react';
// import { Outlet } from 'react-router-dom';
// // import DasboardAdmin from "../moduls/Admin/DasboardAdmin"
// // import PendataanBarang from "../moduls/Admin/pendataanBarang"

// const SideBar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleUserMenu = () => {
//     setIsUserMenuOpen(!isUserMenuOpen);
//   };

//   return (
//     <div>
//       <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//         <div className="px-3 py-3 lg:px-5 lg:pl-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-start">
//               <button
//                 onClick={toggleSidebar}
//                 aria-controls="logo-sidebar"
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//                   />
//                 </svg>
//               </button>
//               <a href="https://flowbite.com" className="flex ms-2 md:me-24">
//                 <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
//                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Lelang</span>
//               </a>
//             </div>
//             <div className="flex items-center">
//               <div className="flex items-center ms-3">
//                 <div>
//                   <button
//                     type="button"
//                     className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//                     aria-expanded={isUserMenuOpen}
//                     onClick={toggleUserMenu}
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <img
//                       className="w-8 h-8 rounded-full"
//                       src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
//                       alt="user photo"
//                     />
//                   </button>
//                 </div>
//                 {isUserMenuOpen && (
//                   <div className="relative"> 
//                     <div className="absolute right-0 z-60 my-6 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
//                       <div className="px-4 py-3">
//                         <p className="text-sm text-gray-900 dark:text-white">Neil Sims</p>
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">085693432984</p>
//                       </div>
//                       <ul className="py-1">
//                       <Link to="/admin">
//                         <li>
//                           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
//                             Sign out
//                           </a>
//                         </li>
//                       </Link>
//                       </ul>
//                     </div>
//                   </div>
//                 )}

//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <aside
//         id="logo-sidebar"
//         className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } sm:translate-x-0`}
//         aria-label="Sidebar"
//       >
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
//   <ul className="space-y-2 font-medium">
//     <NavLink to="/dasboard-admin">
//     <li>
//       <a href="DasboardAdmin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//         <FileText className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
//         <span className="ms-3">Dashboard</span>
//       </a>
//     </li>
//     </NavLink>
    
//     <NavLink to="/pendataan-barang">
//     <li>
//       <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//         <Package className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
//         <span className="ms-3">Pendataan Barang</span>
//       </div>
//     </li>
//     </NavLink>
    
//     <NavLink to="/generate-laporan">
//     <li>
//       <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//         <ClipboardList className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
//         <span className="ms-3">Generate Laporan</span>
//       </a>
//     </li>
//     </NavLink>
    
//     <NavLink to='/buka-tutup-lelang'>
//     <li>
//       <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//         <UserPlus className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
//         <span className="ms-3">Lelang</span>
//       </a>
//     </li>
//     </NavLink>
//   </ul>
// </div>
//         </div>
//       </aside>


//       <div className="p-4 sm:ml-64 ">
//   <div className="p-4 mt-14">
//     <div>
//     <Outlet />
//     </div>
//   </div>
// </div>
// </div>

       
    
//   );
// };

// export default SideBar;
