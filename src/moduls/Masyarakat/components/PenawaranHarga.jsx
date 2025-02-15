const PenawaranHarga = ({ bidPrice, setBidPrice, closeBidPopup, submitBid }) => {
    const handleBidChange = (e) => {
        setBidPrice(e.target.value);
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white border border-gray-200 z-50 rounded-lg w-80 shadow-lg">
            <button
                onClick={closeBidPopup}
                className="absolute top-2 right-2 text-xl font-bold cursor-pointer"
            >
                &times;
            </button>
            <h3 className="text-center mb-4 font-semibold text-lg">Tawar Harga</h3>
            <input
                type="text"
                value={bidPrice}
                onChange={handleBidChange}
                className="w-full px-4 py-2 border rounded-lg mb-4"
                placeholder="Masukkan harga tawaran"
            />
            <div className="flex justify-end">
                <button
                    onClick={closeBidPopup}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                    Batal
                </button>
                <button
                    onClick={submitBid}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default PenawaranHarga;
