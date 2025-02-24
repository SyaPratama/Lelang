import { useLelang } from "../components/AdminContext";
import { useState } from 'react';
import { useAuth } from "../../../Auth/AuthContext";

const HistoryPenawaran = ({ historyData, closePopup }) => {
    const { handleDeletePenawaran, handleEditPenawaran } = useLelang();
    const { name } = useAuth();
    const [editIndex, setEditIndex] = useState(null);
    const [editNominal, setEditNominal] = useState("");

    const handleDelete = async (id_penawaran, username) => {
        await handleDeletePenawaran(id_penawaran, username);
    };

    const handleEdit = (index, nominal) => {
        setEditIndex(index);
        setEditNominal(nominal);
    };

    const handleSaveEdit = async (id_lelang, id_penawaran, username) => {
        await handleEditPenawaran(id_lelang, id_penawaran, editNominal, username);
        setEditIndex(null);
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white border border-gray-200 z-50 rounded-lg w-80 shadow-lg">
            <button 
                onClick={closePopup} 
                className="absolute top-2 right-2 text-xl font-bold cursor-pointer"
            >
                &times;
            </button>
            <h3 className="text-center mb-4 font-semibold text-lg">History Penawaran</h3>
            {historyData.map((data, index) => (
                <div key={index} className={`mb-2 p-2 ${index === 2 ? 'bg-blue-main text-white' : 'bg-[#0077b0] text-white'} rounded-md`}>
                    <div className="flex justify-between items-center">
                        {editIndex === index ? (
                            <>
                                <input 
                                    type="text" 
                                    value={editNominal} 
                                    onChange={(e) => setEditNominal(e.target.value)} 
                                    className="w-full mr-2 px-2 py-1"
                                />
                                <button 
                                    onClick={() => handleSaveEdit(data.id_lelang, data.id_penawaran, name)} 
                                    className="text-green-500 font-semibold"
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <div>
                                    <div><strong>{data.username}</strong></div>
                                    <div>Nawar {data.nominal}</div>
                                </div>
                                {data.username === name && (
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleEdit(index, data.nominal)} 
                                            className="text-yellow-500 font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(data.id_penawaran, data.username)} 
                                            className="text-red-500 font-semibold"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HistoryPenawaran;