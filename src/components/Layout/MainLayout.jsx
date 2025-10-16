 
import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Menu } from "lucide-react";

const getTitle = (path) => {
  if (path.startsWith("/dashboard")) return "Dashboard";
  if (path.startsWith("/courses")) return "Courses";
  if (path.startsWith("/downloads")) return "Download";
  if (path.startsWith("/settings")) return "Settings";
  if (path.startsWith("/private-lessons")) return "Private Lessons";
  if (path.startsWith("/purchase")) return "Purchase";
  if (path.startsWith("/faq")) return "FAQ";
  return "ATPL TV";
};

const MainLayout = () => {
  const location = useLocation();
  const title = useMemo(() => getTitle(location.pathname), [location.pathname]);
  const [expanded, setExpanded] = useState(false); // mini by default

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top white header */}
      <Navbar />

      {/* Black toolbar */}
      <div className="h-12 bg-neutral-900 text-white flex items-center px-4 border-b border-neutral-800 sticky top-16 z-40">
        <button
          onClick={() => setExpanded((s) => !s)}
          className="h-9 w-9 rounded-lg hover:bg-white/10 flex items-center justify-center"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        <span className="ml-3 text-base sm:text-lg font-medium">{title}</span>

        <div className="ml-auto hidden sm:flex items-center gap-4 opacity-80">
          <i className="fab fa-youtube" />
          <i className="fab fa-facebook" />
          <i className="fab fa-twitter" />
          <i className="fab fa-instagram" />
        </div>
      </div>

      {/* Sidebar (below header+toolbar) */}
      <Sidebar
        expanded={expanded}
        onLinkClick={() => {
          /* close on mobile if you add mobile logic later */
        }}
      />

      {/* Content area */}
      <main className={`transition-all duration-200 mt-28 ${expanded ? "ml-64" : "ml-14"} p-4`}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
