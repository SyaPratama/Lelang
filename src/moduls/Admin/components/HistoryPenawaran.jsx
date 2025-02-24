import React from 'react';

const HistoryPenawaran = ({ historyData, closePopup, deleteBid }) => {
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
                        <div>
                            <div><strong>{data.username}</strong></div>
                            <div>Nawar {data.nominal}</div>
                        </div>
                        <button 
                            onClick={() => deleteBid(data.id_penawaran)} 
                            className="bg-red-600 text-white px-2 py-1 rounded-lg"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HistoryPenawaran;