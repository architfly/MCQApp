





import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import AdminSidebar from "./Admin/AdminSidebar";
import AdminNavbar from "./Admin/AdminNavbar";
import "./App.css";

// User pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./components/login/login";
import Signup from "./components/login/Signup";
import Courses from "./Pages/Courses/Courses";
import Downloads from "./Pages/Download/Download";
import PrivateLessons from "./Pages/Privatelessons/PrivateLessons";
 
import PaymentForm from "./Pages/Purchase/PaymentForm";
import CourseCard from "./Pages/Purchase/CourseCard";
import CourseForm from "./Pages/Purchase/CourseForm";
import Confirmation from "./Pages/Purchase/Confirmation";
import GeneralSettings from "./Pages/Settings/GeneralSettings";
import MyFeedback from "./Pages/Settings/MyFeedback";
import MyPurchases from "./Pages/Settings/MyPurchases";
import PaymentSettings from "./Pages/Settings/PaymentSettings";
import Ourteam from "./Pages/Ourteam/Ourteam";
import Contact from "./Pages/Contact/Contact";
import Faq from "./Pages/Faq/Faq";
import Airlaw from "./components/Atpl/Airlaw";
import AircraftGeneralKnowledge from "./components/Atpl/AircraftGeneralKnowledge";
import Communication from "./components/Atpl/Communication";
import CrmKurulMulakati from "./Pages/Privatelessons/CrmKurulMulakati";
import AircraftTest from "./components/Atpl/AircraftTest/AircraftTest";
import AircraftResult from "./components/Atpl/AircraftTest/AircraftResult";

// Admin pages
import AdminDashboard from "./Admin/AdminDashboard";
import CourseList from "./Admin/CourseList";
import QuestionList from "./Admin/QuestionList";
import AdminHelp from "./Admin/AdminHelp";
import Analytics from "./Admin/Analytics";
import CourseTest from "./Pages/CourseTest/CourseTest";
import AdminTest from "./Admin/AdminTest";
import PlanPromocode from "./Admin/PlanPromocode";
import Purchase from "./Admin/Purchase";

import { ToastContainer } from "react-toastify";
import Test from "./components/Test/test";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      if (location.pathname !== "/signup") navigate("/login");
    }
  }, [location.pathname, navigate]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isExamMode=
  location.pathname === "/aircraft-test" || 
  location.pathname.includes("/test");

  return (
    <>
      {/* Login/Signup Routes */}
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* Admin Layout */}
      {isAuthenticated && userRole === "admin" && (
        <div className="flex h-screen">
          <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 flex flex-col bg-gray-100">
            <AdminNavbar toggleSidebar={toggleSidebar} />
            <main className="flex-1 mt-14 overflow-y-auto p-0">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/course-list" element={<CourseList />} />
                <Route path="/admin/question-list" element={<QuestionList />} />
                <Route path="/admin/admin-help" element={<AdminHelp />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/course-test" element={<CourseTest />} />
                <Route path="/admin/course-list/admin-test/:courseId" element={<AdminTest />} />
                <Route path="/admin/PlanPromocode" element={<PlanPromocode />} />
                <Route path="/admin/Purchase" element={<Purchase />} />

              </Routes>
            </main>
          </div>
        </div>
      )}

      {/* User Layout */}
      {isAuthenticated && userRole === "user" && (
        <div className="flex h-screen bg-gray-100">
          {!isExamMode && (
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
          )}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <main className={`flex-1 ${isExamMode ? "" : "overflow-y-auto"}`}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses/airlaw" element={<Airlaw />} />
                <Route path="/courses/aircraft" element={<AircraftGeneralKnowledge />} />
                <Route path="/courses/communication" element={<Communication />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/private-lessons" element={<PrivateLessons />} />
                <Route path="/private-lessons/crm-kurul-mulakati" element={<CrmKurulMulakati />} />
                <Route path="/purchase/purchase" element={<Purchase />} />
                <Route path="/purchase/PaymentForm" element={<PaymentForm />} />
                <Route path="/purchase/CourseCard" element={<CourseCard />} />
                <Route path="/purchase/CourseForm" element={<CourseForm />} />
                <Route path="/purchase/Confirmation" element={<Confirmation />} />
                <Route path="/settings/general-settings" element={<GeneralSettings />} />
                <Route path="/settings/payment-settings" element={<PaymentSettings />} />
                <Route path="/settings/my-purchases" element={<MyPurchases />} />
                <Route path="/settings/my-feedback" element={<MyFeedback />} />
                <Route path="/our-team" element={<Ourteam />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/aircraft-test" element={<AircraftTest />} />
                <Route path="/aircraft-result" element={<AircraftResult />} />
                <Route path="/Courses/:courseId" element={<Courses />} />
                <Route path="/Courses/:courseId/test" element={<Test/>} />
              </Routes>
            </main>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
