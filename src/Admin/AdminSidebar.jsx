import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHandsHelping } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri"

import { 
  FaHome, 
  FaBook, 
  FaPlusCircle, 
  FaEdit, 
  FaQuestionCircle 
} from "react-icons/fa";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <FaHome />, exact: true },
    {
      label: "Courses",
      icon: <FaBook />,
      children: [
        { path: "/admin/course-list", label: "Course List", icon: <FaBook /> },
        // { path: "/admin/add-course", label: "Add Course", icon: <FaPlusCircle /> },
        // { path: "/admin/edit-course", label: "Edit Course", icon: <FaEdit /> },
      ],
    },
    {
      label: "Questions",
      icon: <FaQuestionCircle />,
      children: [
        { path: "/admin/question-list", label: "Question List", icon: <FaBook /> },
        // { path: "/admin/add-question", label: "Add Question", icon: <FaPlusCircle /> },
        // { path: "/admin/edit-question", label: "Edit Question", icon: <FaEdit /> },
      ],
    },

    { path: "/admin/PlanPromocode", label: "Plan & Promocode", icon: <FaShoppingCart /> },
     
    { path: "/admin/Purchase", label: "Purchase", icon: <RiLock2Fill /> },

    { path: "/admin/analytics", label: "Analytics", icon: <ImUsers /> },

    { path: "/admin/admin-help", label: "Help", icon: <FaHandsHelping /> }
 
    
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-30 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide">
          <ul className="space-y-2">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="flex items-center w-full p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="ml-auto">{openMenus[item.label] ? "▾" : "▸"}</span>
                  </button>

                  {openMenus[item.label] && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center p-2 rounded-md transition-colors ${
                                isActive
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-400 hover:bg-gray-700"
                              }`
                            }
                            onClick={() =>
                              window.innerWidth < 1024 && toggleSidebar()
                            }
                          >
                            <span className="mr-3 text-lg">{child.icon}</span>
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`
                    }
                    onClick={() =>
                      window.innerWidth < 1024 && toggleSidebar()
                    }
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
