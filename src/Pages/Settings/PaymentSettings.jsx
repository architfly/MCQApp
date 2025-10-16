import React, { useState } from "react";
import { motion } from "framer-motion";

const PaymentSettings = () => {
  const [formData, setFormData] = useState({
    accountType: "Individual",
    fullName: "",
    idNumber: "",
    billingAddress: "",
    town: "",
    city: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Billing Information Updated!");
  };

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-blue-600 border-b pb-2"
      >
        Billing Information
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-6 bg-white shadow-lg rounded-xl p-6 space-y-5"
      >
        {/* Account Type */}
        <div>
          <label className="font-semibold block mb-2">Account Type</label>
          <div className="flex gap-6">
            {["Individual", "Corporate"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accountType"
                  value={type}
                  checked={formData.accountType === type}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Full Name */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-1">
          <label className="block font-medium">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </motion.div>

        {/* ID Number */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-1">
          <label className="block font-medium">Identification Number *</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="Enter ID / Passport number"
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </motion.div>

        {/* Billing Address */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-1">
          <label className="block font-medium">Billing Address *</label>
          <textarea
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            placeholder="Enter your billing address"
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            rows={3}
            required
          />
        </motion.div>

        {/* Town & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-1">
            <label className="block font-medium">Town *</label>
            <input
              type="text"
              name="town"
              value={formData.town}
              onChange={handleChange}
              placeholder="Enter town"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-1">
            <label className="block font-medium">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full md:w-auto"
        >
          UPDATE INFO
        </motion.button>
      </motion.form>
    </div>
  );
};

export default PaymentSettings;
