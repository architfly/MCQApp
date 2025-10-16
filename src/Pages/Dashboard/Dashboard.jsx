 

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
              className="rounded-xl shadow-md w-full h-70 object-cover" // 🔹 reduced height
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
              className="rounded-xl shadow-md w-full h-70 object-cover" // 🔹 added fixed height
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
















// import ketankkiimage from "../../../public/images/pic.jpg";
// import ketan2 from "../../../public/images/pic1.jpg";


// import React, { useState, useEffect } from "react";
// import {
//   BookOpen,
//   Download,
//   HelpCircle,
//   Phone,
//   Moon,
//   Sun,
//   CheckCircle,
//   Award,
//   Clock,
// } from "lucide-react";

 

// const Dashboard = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   const quickAccess = [
//     { title: "Courses", icon: BookOpen, link: "/courses", color: "bg-blue-500" },
//     { title: "Downloads", icon: Download, link: "/downloads", color: "bg-green-500" },
//     { title: "FAQ", icon: HelpCircle, link: "/faq", color: "bg-purple-500" },
//     { title: "Contact", icon: Phone, link: "/contact", color: "bg-orange-500" },
//   ];

//   const stats = [
//     { label: "Tests Available", value: "14", icon: BookOpen, color: "text-blue-500" },
//     { label: "Questions", value: "5000+", icon: CheckCircle, color: "text-green-500" },
//     { label: "Study Hours", value: "120+", icon: Clock, color: "text-purple-500" },
//   ];

//   const handleNavigation = (link) => {
//     console.log(`Navigating to: ${link}`);
//     // integrate with router: navigate(link)
//   };

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-500 ${
//         darkMode
//           ? "bg-gray-900"
//           : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
//       }`}
//     >
       

//       {/* Main Content */}
//       <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         {/* Welcome Banner */}
//         <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 mb-8 w-full shadow-2xl">
//           <div className="absolute inset-0 bg-black/10"></div>
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 animate-pulse"></div>
//           <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back! 👋</h2>
//               <p className="text-sm sm:text-base text-blue-100">Ready to ace your ATPL exams? Explore our comprehensive courses.</p>
//             </div>
//             <button
//               onClick={() => handleNavigation("/purchase")}
//               className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-0.5"
//             >
//               Purchase Now
//             </button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 w-full">
//           {stats.map((stat, idx) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={idx}
//                 className={`relative ${
//                   darkMode ? "bg-gray-800/80" : "bg-white/70"
//                 } rounded-2xl p-6 shadow-lg hover:shadow-2xl backdrop-blur-md transition-all transform hover:-translate-y-1 hover:scale-105 w-full`}
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <Icon className={`w-8 h-8 ${stat.color}`} />
//                   <span
//                     className={`text-3xl font-bold ${
//                       darkMode ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {stat.value}
//                   </span>
//                 </div>
//                 <p
//                   className={`text-sm font-medium ${
//                     darkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   {stat.label}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Course Packages */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 w-full">
//           {/* All-in-One Bundle */}
//           <div
//             onClick={() => handleNavigation("/purchase")}
//             className={`group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl ${
//               darkMode ? "bg-gray-800/80" : "bg-white/80"
//             } transition-all transform hover:scale-105 hover:shadow-3xl w-full`}
//           >
//             <div className="relative h-75 sm:h-85 overflow-hidden rounded-3xl">
//               <div
//                 className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//                 style={{ backgroundImage: `url(${ketan2})` }}
//               ></div>
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
//                 <Award className="w-16 h-16 mb-3 opacity-90 group-hover:scale-110 transition-transform" />
//                 <h3 className="text-xl sm:text-2xl font-bold text-center">
//                   Complete Package
//                 </h3>
//                 <div className="mt-3 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
//                   Best Value
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <h3
//                 className={`text-lg sm:text-xl font-bold mb-2 ${
//                   darkMode ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 All-in-One Bundle
//               </h3>
//               <p
//                 className={`text-sm sm:text-base mb-4 ${
//                   darkMode ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 Get unlimited access to all 14 ATPL subjects with 5000+ practice
//                 questions.
//               </p>
//               <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:scale-105">
//                 Explore Bundle
//               </button>
//             </div>
//           </div>

//           {/* Subject-by-Subject */}
//           <div
//             onClick={() => handleNavigation("/courses")}
//             className={`group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl ${
//               darkMode ? "bg-gray-800/80" : "bg-white/80"
//             } transition-all transform hover:scale-105 hover:shadow-3xl w-full`}
//           >
//             <div className="relative h-75 sm:h-85 overflow-hidden rounded-3xl">
//               <div
//                 className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//                 style={{ backgroundImage: `url(${ketankkiimage})` }}
//               ></div>
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
//                 <BookOpen className="w-16 h-16 mb-3 opacity-90 group-hover:scale-110 transition-transform" />
//                 <h3 className="text-xl sm:text-2xl font-bold text-center">
//                   Individual Courses
//                 </h3>
//                 <div className="mt-3 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
//                   Flexible Learning
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <h3
//                 className={`text-lg sm:text-xl font-bold mb-2 ${
//                   darkMode ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Subject-by-Subject
//               </h3>
//               <p
//                 className={`text-sm sm:text-base mb-4 ${
//                   darkMode ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 Choose specific subjects and master them at your own pace.
//               </p>
//               <button className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 shadow-md transition-all hover:scale-105">
//                 Browse Courses
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Quick Access */}
//         <div
//           className={`${
//             darkMode ? "bg-gray-800/80" : "bg-white/80"
//           } rounded-3xl p-6 shadow-2xl w-full`}
//         >
//           <h3
//             className={`text-lg sm:text-xl font-bold mb-6 ${
//               darkMode ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Quick Access
//           </h3>
//           <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 w-full">
//             {quickAccess.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => handleNavigation(item.link)}
//                   className={`group p-4 sm:p-5 rounded-2xl transition-all transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl w-full ${
//                     darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <div
//                     className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform`}
//                   >
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <p
//                     className={`text-xs sm:text-sm font-semibold text-center ${
//                       darkMode ? "text-gray-200" : "text-gray-700"
//                     }`}
//                   >
//                     {item.title}
//                   </p>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer
//         className={`mt-12 py-6 border-t ${
//           darkMode ? "border-gray-800" : "border-gray-200"
//         }`}
//       >
//         <div className="text-center px-4 sm:px-6 lg:px-8 w-full">
//           <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//             © 2024 ATPL TV. Your trusted partner in aviation education.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;
