import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  PlusCircle,
  Users,
  FileText,
  BarChart3,
  Moon,
  Sun,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import cloudBg from "../../public/images/pic6.jpg";
import ko from "../../public/images/pic14.jpg";
import questionPic from "../../public/images/pic15.jpg";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // 🔹 Stats (replace with API later)
  const [stats, setStats] = useState({
    totalUsers: 150,
    testAttempts: 80,
    purchasedCourses: 60,
  });

  // 🔹 Dark Mode Effect
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // 🔹 Quick Access Items
  const quickAccess = [
    { title: "Add Course", icon: PlusCircle, link: "/admin/course-list" },
    { title: "Add Question", icon: FileText, link: "/admin/question-list" },
    { title: "Help", icon: Users, link: "/admin/admin-help" },
    { title: "Analytics", icon: BarChart3, link: "/admin/analytics" },
  ];

  return (
    <div
      className="min-h-screen transition bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${cloudBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 px-6 md:px-10 pt-8 md:pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-indigo-600 text-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div>
            <h2 className="text-3xl font-bold">Welcome Admin 👨‍💻</h2>
            <p className="text-sm opacity-90 mt-1">
              Manage courses, questions, and users from one dashboard.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
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
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <div
            onClick={() => navigate("/admin/analytics")}
            className="cursor-pointer bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
          >
            <Users className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold">{stats.totalUsers}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Enrolled Users
            </p>
          </div>

          <div
            onClick={() => navigate("/admin/analytics")}
            className="cursor-pointer bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
          >
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold">{stats.testAttempts}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Users Attempted Tests
            </p>
          </div>

          <div
            onClick={() => navigate("/admin/analytics")}
            className="cursor-pointer bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
          >
            <ShoppingCart className="w-10 h-10 text-pink-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold">{stats.purchasedCourses}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Courses Purchased
            </p>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/admin/course-list")}
            className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition p-5"
          >
            <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Manage Courses
            </h3>
            <img
              src={ko}
              alt="Courses"
              className="rounded-xl shadow-md w-full h-64 object-cover mb-4"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/admin/question-list")}
            className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition p-5"
          >
            <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Manage Questions
            </h3>
            <img
              src={questionPic}
              alt="Questions"
              className="rounded-xl shadow-md w-full h-64 object-cover mb-4"
            />
          </motion.div>
        </div>

        {/* Quick Access Section */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickAccess.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(item.link)}
              className="cursor-pointer flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-xl transition"
            >
              <item.icon className="w-8 h-8 text-indigo-600 mb-3" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
