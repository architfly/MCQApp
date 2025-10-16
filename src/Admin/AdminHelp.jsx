import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  CreditCard,
  Phone,
  FileQuestion,
  Settings,
} from "lucide-react";

const AdminHelp = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: "gettingStarted",
      title: "Getting Started",
      desc: "Learn how to use the admin panel.",
      content: [
        "Login to the admin panel using your credentials.",
        "Review the dashboard overview (Courses, Questions, Users, Reports).",
        "Navigate using the sidebar menu to manage different sections.",
      ],
      icon: <Settings className="w-6 h-6 text-blue-500" />,
    },
    {
      id: "courses",
      title: "Course Management",
      desc: "Add, edit, and manage courses.",
      content: [
        "Add new courses with title, description, and price.",
        "Edit or delete existing courses.",
        "View a list of purchased courses by users.",
      ],
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
    },
    {
      id: "users",
      title: "User Management",
      desc: "Manage users and their activities.",
      content: [
        "View all registered users.",
        "Block or unblock a user.",
        "Check user purchases and test reports.",
      ],
      icon: <Users className="w-6 h-6 text-purple-500" />,
    },
    {
      id: "payments",
      title: "Payments & Reports",
      desc: "Track transactions and reports.",
      content: [
        "Track all payment transactions.",
        "View detailed purchase reports for each course.",
        "Handle refunds and resolve payment-related issues.",
      ],
      icon: <CreditCard className="w-6 h-6 text-pink-500" />,
    },
    {
      id: "faq",
      title: "FAQs",
      desc: "Quick answers to common problems.",
      content: [
        "A course is not visible → Check if it’s assigned to the user.",
        "Payment successful but course not unlocked → Contact support.",
        "Forgot Password → Use the reset password option.",
      ],
      icon: <FileQuestion className="w-6 h-6 text-indigo-500" />,
    },
    {
      id: "contact",
      title: "Contact & Support",
      desc: "Reach our support team anytime.",
      content: [
        "For any technical issues, please reach out to our support team.",
        "📧 Email: support@mcqapp.com",
        "☎️ Phone: +91 98765 43210",
      ],
      icon: <Phone className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-700 mb-3">
        📖 Admin Help Center
      </h1>
      <p className="text-center text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base">
        Everything you need to efficiently manage your{" "}
        <b>MCQ Test Application</b>.
      </p>

      <div className="space-y-4">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            className="border rounded-lg sm:rounded-xl shadow-md overflow-hidden bg-white"
            whileHover={{ scale: 1.01 }}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 text-left"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                {section.icon}
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {section.desc}
                  </p>
                </div>
              </div>
              <span className="text-xl sm:text-2xl text-gray-500">
                {openSection === section.id ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-700 text-sm sm:text-base"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="list-disc ml-4 sm:ml-5 mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminHelp;
