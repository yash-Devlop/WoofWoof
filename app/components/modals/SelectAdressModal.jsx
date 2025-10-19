export const SelectAddressModal = ({ isOpen, onClose, addresses, onSelect, selectedAddressId }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {addresses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No saved addresses found.</p>
                <p className="text-sm mt-2">Please add a new address to continue.</p>
              </div>
            ) : (
              addresses.map((address, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onSelect(address, index)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedAddressId === index
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-xs font-semibold rounded">
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-gray-900">
                        {address.firstName} {address.lastName}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{address.address}</p>
                      <p className="text-gray-600 text-sm">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        Contact: {address.contact}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAddressId === index
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAddressId === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t px-6 py-4">
            <button
              onClick={onClose}
              disabled={selectedAddressId === null && addresses.length > 0}
              className="w-full px-4 py-3 bg-[#F91F54] text-white rounded-lg hover:bg-[#d20037] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {addresses.length === 0 ? "Close" : "Deliver to this Address"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};