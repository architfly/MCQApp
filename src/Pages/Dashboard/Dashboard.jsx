 

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Download,
  HelpCircle,
  Phone,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ketankkiimage from "../../../public/images/pic.jpg";
import ketan2 from "../../../public/images/pic1.jpg";
import cloudBg from "../../../public/images/pic6.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const quickAccess = [
    { title: "Courses", icon: BookOpen, link: "/courses" },
    { title: "Downloads", icon: Download, link: "/downloads" },
    { title: "FAQ", icon: HelpCircle, link: "/faq" },
    { title: "Contact", icon: Phone, link: "/contact" },
  ];

  return (
    <div
      className="min-h-screen p-6 transition bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${cloudBg})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-600 text-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div>
            <h2 className="text-3xl font-bold">Welcome to ATPL TV ✈️</h2>
            <p className="text-sm opacity-90 mt-1">
              Take a glance at our free content from the Courses menu.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              {darkMode ? (
                <Sun className="text-yellow-300" />
              ) : (
                <Moon className="text-gray-200" />
              )}
            </button>

            {/* Purchase Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/purchase")}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl shadow-lg font-semibold"
            >
              Purchase Now
            </motion.button>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* All in One – Packages */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/purchase")}
            className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition p-5"
          >
            <h3 className="text-lg font-bold text-blue-600 mb-4">
              All in One – Packages
            </h3>
            <img
              src={ketan2}
              alt="Packages"
              className="rounded-xl shadow-md w-full h-80 object-cover" // 🔹 reduced height
            />
          </motion.div>

          {/* One by One – Courses */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/courses")}
            className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition p-5"
          >
            <h3 className="text-lg font-bold text-blue-600 mb-4">
              One by One – Courses
            </h3>
            <img
              src={ketankkiimage}
              alt="Courses"
              className="rounded-xl shadow-md w-full h-80 object-cover" // 🔹 added fixed height
            />
          </motion.div>
        </div>

        {/* Quick Access Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-blue-600 mb-6">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickAccess.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.link)}
                  className="flex flex-col items-center p-4 bg-blue-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-md cursor-pointer transition"
                >
                  <Icon className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;













 