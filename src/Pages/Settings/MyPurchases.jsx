import React from "react";
import { motion } from "framer-motion";

const MyPurchases = () => {
  const purchases = []; // Add data later (dynamic API or dummy)

  return (
    <div className="p-6">
      {/* Title */}
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-blue-600 mb-4"
      >
        My Purchases
      </motion.h2>

      {/* Card container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200"
      >
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-left">
                {[
                  "Purchase No",
                  "Item Category",
                  "Item Description",
                  "Item Duration",
                  "Start Date",
                  "Expiry Date",
                  "Purchase Channel",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="p-3 text-sm font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    No purchases found
                  </td>
                </tr>
              ) : (
                purchases.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="p-3 border-t">{item.purchaseNo}</td>
                    <td className="p-3 border-t">{item.category}</td>
                    <td className="p-3 border-t">{item.description}</td>
                    <td className="p-3 border-t">{item.duration}</td>
                    <td className="p-3 border-t">{item.startDate}</td>
                    <td className="p-3 border-t">{item.expiryDate}</td>
                    <td className="p-3 border-t">{item.channel}</td>
                    <td className="p-3 border-t">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MyPurchases;
