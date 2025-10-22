import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaGraduationCap,
  FaShoppingCart,
  FaUsers,
  FaQuestion,
} from "react-icons/fa";
import { MdCloudDownload } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../APIRedux/CourseReducer/GetCourseReducer";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.getCourse?.data?.data || []);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    {
      label: "Courses",
      icon: <FaGraduationCap />,
      dynamic: true, // custom flag to show courses dynamically
    },
    
    

    { path: "/purchase", label: "Purchase" , icon: <FaShoppingCart />},
 
    { path: "/our-team", label: "Our Team", icon: <FaUsers /> },
    { path: "/faq", label: "FAQ", icon: <FaQuestion /> },
    
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-30 transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Navigation</h1>
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
            {navItems.map((item) => {
              if (item.dynamic) {
                // 🔹 This is our "Courses" dropdown
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="flex items-center w-full p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                      <span className="ml-auto">
                        {openMenus[item.label] ? "▾" : "▸"}
                      </span>
                    </button>

                    {openMenus[item.label] && (
                      <ul className="ml-6 mt-2 space-y-1">
                        {courseData?.length > 0 ? (
                          courseData?.map((course) => (
                            <li key={course._id}>
                              <NavLink
                                to={`/Courses/${course._id}`}
                                
                                className={({ isActive }) =>
                                  `block p-2 rounded-md transition-colors ${
                                    isActive
                                      ? "bg-blue-600 text-white"
                                      : "text-gray-400 hover:bg-gray-700"
                                  }`
                                }
                                onClick={() =>
                                  window.innerWidth < 1024 && toggleSidebar()
                                }
                              >
                                {course.courseName} ({course.courseCode})
                              </NavLink>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500 italic p-2">
                            No courses found
                          </li>
                        )}
                      </ul>
                    )}
                  </li>
                );
              }

              // 🔹 Regular items (no dynamic data)
              if (item.children) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="flex items-center w-full p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                      <span className="ml-auto">
                        {openMenus[item.label] ? "▾" : "▸"}
                      </span>
                    </button>

                    {openMenus[item.label] && (
                      <ul className="ml-6 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                `block p-2 rounded-md transition-colors ${
                                  isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:bg-gray-700"
                                }`
                              }
                              onClick={() =>
                                window.innerWidth < 1024 && toggleSidebar()
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              // 🔹 Normal single link
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`
                    }
                    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
