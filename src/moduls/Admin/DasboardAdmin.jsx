import { useEffect, useState } from "react";
import Header from "./components/Header";
import { useAuth } from "../../Auth/AuthContext"; // Sesuaikan dengan path yang benar
import axios from "axios";
import { https } from "../../config/url"; // Sesuaikan dengan path yang benar
import { FaUsers, FaUserShield, FaBoxOpen, FaGavel, FaCheck, FaTimes } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
// import bannerImage from './public/.jpg'; // Sesuaikan dengan path yang benar

const DasboardAdmin = () => {
  const { name, token } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [barangCount, setBarangCount] = useState(0);
  const [lelangCount, setLelangCount] = useState(0);
  const [lelangOpenCount, setLelangOpenCount] = useState(0);
  const [lelangClosedCount, setLelangClosedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(https + "/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const adminResponse = await axios.get(https + "/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const barangResponse = await axios.get(https + "/barang", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const lelangResponse = await axios.get(https + "/lelang", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const lelangData = lelangResponse.data.data.dataLelang;
        const openCount = lelangData.filter(lelang => lelang.status === "dibuka").length;
        const closedCount = lelangData.filter(lelang => lelang.status === "ditutup").length;

        setUserCount(userResponse.data.data.dataUser.length);
        setAdminCount(adminResponse.data.data.admin.length);
        setBarangCount(barangResponse.data.data.barang.length);
        setLelangCount(lelangData.length);
        setLelangOpenCount(openCount);
        setLelangClosedCount(closedCount);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [token]);

  const pieData = [
    { name: 'Lelang Buka', value: lelangOpenCount },
    { name: 'Lelang Tutup', value: lelangClosedCount },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <>
      <Header title="Dashboard Admin" name={name} />
      <div className="container mx-auto py-8">
        <div className="relative bg-cover bg-center h-64 mb-8 rounded-lg overflow-hidden shadow-lg" >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-start justify-center h-full text-white p-5">
            <h1 className="text-4xl font-bold">Selamat Datang, {name}!</h1>
            <p className="text-xl mt-2">Pantau aktivitas lelang dan data penting lainnya di sini</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <FaUsers className="text-4xl text-blue-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
              <p className="text-3xl text-blue-500">{userCount}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <FaUserShield className="text-4xl text-blue-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Admins</h3>
              <p className="text-3xl text-blue-500">{adminCount}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <FaBoxOpen className="text-4xl text-blue-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Barang</h3>
              <p className="text-3xl text-blue-500">{barangCount}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <FaGavel className="text-4xl text-blue-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Lelang</h3>
              <p className="text-3xl text-blue-500">{lelangCount}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <FaCheck className="text-4xl text-blue-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Lelang (Buka)</h3>
              <p className="text-3xl text-blue-500">{lelangOpenCount}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <FaTimes className="text-4xl text-blue-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Lelang (Tutup)</h3>
              <p className="text-3xl text-blue-500">{lelangClosedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Status Lelang</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default DasboardAdmin;