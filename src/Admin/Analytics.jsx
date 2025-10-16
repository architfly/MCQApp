import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, FileCheck, ShoppingCart, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { totalUserCount, resettotalUserCountState } from "../APIRedux/AnalyticsReducer/TotalUserCountReducer";
import { totalTestCount } from "../APIRedux/AnalyticsReducer/TotalTestAttemptReducer";

const Analytics = () => {
  const dispatch = useDispatch();

  // Redux state
  const { data: totalUsersData, isLoading, isError, errorMessage } = useSelector(
    (state) => state.totalUserCount
  );

   useEffect(() => {
  
    dispatch(totalTestCount())

   
  }, [dispatch]);


  const {testData}=useSelector(state=>state.totalTestCount)



  const [searchTerm, setSearchTerm] = useState("");

  // Fetch total users on component mount
  useEffect(() => {
    dispatch(totalUserCount());
    dispatch(totalTestCount())

    return () => {
      dispatch(resettotalUserCountState());
    };
  }, [dispatch]);

  // For demo purpose, keep user details as before
  const [users] = useState([
    { id: 1, name: "Aarav Sharma", email: "aarav@example.com", testAttempted: true, purchased: true },
    { id: 2, name: "Neha Patel", email: "neha@example.com", testAttempted: true, purchased: false },
    { id: 3, name: "Rohan Singh", email: "rohan@example.com", testAttempted: false, purchased: true },
    { id: 4, name: "Simran Kaur", email: "simran@example.com", testAttempted: true, purchased: false },
    { id: 5, name: "Karan Verma", email: "karan@example.com", testAttempted: false, purchased: false },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsersCount = totalUsersData
    ? Object.values(totalUsersData.counts).reduce((a, b) => a + b, 0)
    : 0;

  const totalNormalUsers = totalUsersData?.counts?.user || 0;
  const totalAdmins = totalUsersData?.counts?.admin || 0;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 lg:mb-10 text-center"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-gray-200">
          Analytics Dashboard
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-2">
          Insights into users, test activities, and course purchases
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-10"
      >
        {/* Total Users Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 sm:p-6 bg-indigo-600 shadow rounded-xl flex flex-col items-center text-center transition"
        >
          <div className="mb-2 sm:mb-3">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white">Total Users</h3>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {isLoading ? "Loading..." : totalNormalUsers}
          </p>
          {/* <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 rounded-full bg-white/30 text-white text-xs sm:text-sm font-medium">
              Users: {totalNormalUsers}
            </span>
            <span className="px-2 py-1 rounded-full bg-white/30 text-white text-xs sm:text-sm font-medium">
              Admins: {totalAdmins}
            </span>
          </div> */}
        </motion.div>

        {/* Other demo cards */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 sm:p-6 bg-green-600 shadow rounded-xl flex flex-col items-center text-center transition"
        >
          <div className="mb-2 sm:mb-3">
            <FileCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white">Test Attempts</h3>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{testData?.totalAttempts}</p>
          {/* <p className="text-xs sm:text-sm text-white/80">Users attempted tests</p> */}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 sm:p-6 bg-blue-600 shadow rounded-xl flex flex-col items-center text-center transition"
        >
          <div className="mb-2 sm:mb-3">
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white">Courses Purchased</h3>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">2</p>
          <p className="text-xs sm:text-sm text-white/80">Total purchases</p>
        </motion.div>
      </motion.div>

      {/* Rest of your table & search bar remains unchanged */}
    </div>
  );
};

export default Analytics;
