 



import React, { useState } from "react";
import { Camera, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const GeneralSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: " ",
    nickname: " ",
    country: "        ",
    flightSchool: "",
  });

  const [fastPass, setFastPass] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle password inputs
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Submit functions
  const handleUpdateInfo = () => {
    alert("✅ Info Updated Successfully!");
  };

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.newPass) {
      alert("⚠️ Please fill both fields!");
      return;
    }
    alert("🔑 Password Changed Successfully!");
    setPasswords({ current: "", newPass: "" });
  };

  return (
    <div className="p-6 space-y-6">
     <h1 className="text-2xl font-bold text-blue-600 border-b border-blue-600 pb-2">
  General Settings
</h1>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white shadow rounded-xl p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-blue-600">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Nickname"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <select
              name="flightSchool"
              value={formData.flightSchool}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Flight School</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdateInfo}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
          >
            UPDATE INFO
          </motion.button>
        </motion.div>

        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow rounded-xl p-6 flex flex-col items-center"
        >
          {/* ✅ Passport style photo */}
          <div className="w-28 h-36 rounded-md border flex items-center justify-center overflow-hidden bg-gray-200 relative">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-4xl">👤</span>
            )}
            <label
              htmlFor="uploadPic"
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:scale-110 transition"
            >
              <Camera size={16} />
            </label>
            <input
              type="file"
              id="uploadPic"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePic}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">Profile Picture</p>

          {/* ✅ EDIT Button */}
          <label
            htmlFor="uploadPic"
            className="mt-2 px-3 py-1 border border-blue-600 text-blue-600 rounded-md text-sm cursor-pointer hover:bg-blue-600 hover:text-white transition"
          >
            EDIT
          </label>
        </motion.div>
      </div>

      {/* Preferences + Password Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white shadow rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-blue-600 flex items-center">
            <Zap className="mr-2 text-yellow-500" /> Preferences
          </h2>
          <div className="flex items-center justify-between mt-4">
            <span className="font-medium">Fast Pass</span>
            <span
              className={`${
                fastPass ? "text-green-600" : "text-red-600"
              } font-bold`}
            >
              {fastPass ? "ON" : "OFF"}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFastPass(!fastPass)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
          >
            CHANGE STATUS
          </motion.button>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white shadow rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-blue-600 flex items-center">
            <Lock className="mr-2 text-gray-600" /> Change Password
          </h2>
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            className="border rounded-lg p-2 w-full mt-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            name="newPass"
            value={passwords.newPass}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="border rounded-lg p-2 w-full mt-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePasswordUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
          >
            CHANGE PASSWORD
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default GeneralSettings;
