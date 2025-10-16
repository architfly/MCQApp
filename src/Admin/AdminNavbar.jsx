 









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, ChevronDown, LogOut } from "lucide-react";
import { FaBars } from "react-icons/fa"; // Hamburger icon
import kk from "../../public/images/unnamed.png";

const AdminNavbar = ({ toggleSidebar }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const navigate = useNavigate();

  // Get first letter of logged-in email
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setUserInitial(user.email.charAt(0).toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out!");
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 lg:left-64 right-0 h-14 bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-between px-4 lg:px-6 shadow-lg z-40">
        <div className="flex items-center gap-3">
          {/* Hamburger for mobile */}
          <button
            className="lg:hidden text-white mr-3"
            onClick={toggleSidebar}
            title="Menu"
          >
            <FaBars size={20} />
          </button>
          <img src={kk} alt="Tick" className="w-10 h-10" />
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 rounded-full bg-gray-800 hover:scale-110 transition"
            title="Help"
          >
            <HelpCircle size={18} />
          </button>

          <div className="relative">
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full cursor-pointer hover:scale-105 transition"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-semibold text-white text-sm">
                {userInitial || "U"}
              </div>
              <ChevronDown size={18} />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showHelp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Need Help?</h2>
            <p className="text-sm mb-4">
              Contact us at <strong>support@yourapp.com</strong>
            </p>
            <button
              onClick={() => setShowHelp(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
