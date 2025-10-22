// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { CheckCircle, XCircle } from "lucide-react";

// // Simple local Card Components
// const Card = ({ children, className = "", ...props }) => (
//   <div
//     className={`bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition-all ${className}`}
//     {...props}
//   >
//     {children}
//   </div>
// );
// const CardHeader = ({ children }) => (
//   <div className="border-b pb-2 mb-3">{children}</div>
// );
// const CardTitle = ({ children }) => (
//   <h3 className="text-lg font-semibold text-center text-gray-800">{children}</h3>
// );
// const CardContent = ({ children }) => <div>{children}</div>;

// // Simple local Button & Input
// const Button = ({ children, className = "", ...props }) => (
//   <button
//     className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition disabled:opacity-60 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );
// const Input = ({ className = "", ...props }) => (
//   <input
//     className={`border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
//     {...props}
//   />
// );

// const Purchase = () => {
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [promoCode, setPromoCode] = useState("");
//   const [validPromo, setValidPromo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const userId = "USER_ID_FROM_CONTEXT_OR_REDUX"; // Replace with actual user ID

//   // Simple toast helper
//   const showToast = (title, description, type = "info") => {
//     if (type === "error") console.error(title, description);
//     alert(`${title}\n${description || ""}`);
//   };

//   // Fetch plans
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const res = await axios.get("/plan/get");
//         console.log("Plans API Response:", res.data);
//         setPlans(res.data.data || res.data || []); // safe fallback
//       } catch (err) {
//         showToast("Error fetching plans", "Please try again later.", "error");
//       }
//     };
//     fetchPlans();
//   }, []);

//   // Apply promo code
//   const handleApplyPromo = async () => {
//     if (!promoCode) return;
//     try {
//       const res = await axios.get("/promocode/getAll");
//       const found = res.data.find((code) => code.code === promoCode);
//       if (found) {
//         setValidPromo(found);
//         showToast("Promo code applied!", `You got ${found.discount}% off.`);
//       } else {
//         setValidPromo(null);
//         showToast("Invalid promo code", "Please check the code and try again.", "error");
//       }
//     } catch (err) {
//       showToast("Error validating promo code", "Something went wrong.", "error");
//     }
//   };

//   // Purchase
//   const handlePurchase = async () => {
//     if (!selectedPlan) {
//       showToast("Select a plan first", "", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         planId: selectedPlan._id,
//         userId,
//         promoCodeId: validPromo?._id || null,
//       };
//       await axios.post("/purchase/create", payload);
//       showToast("Purchase successful!", "Your course is now unlocked.");
//       setSelectedPlan(null);
//       setPromoCode("");
//       setValidPromo(null);
//     } catch (err) {
//       showToast("Purchase failed", "Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateDiscountedPrice = (price) => {
//     if (validPromo) {
//       return (price - (price * validPromo.discount) / 100).toFixed(2);
//     }
//     return price;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center py-10 px-4">
//       <motion.h1
//         className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Choose Your Course Plan
//       </motion.h1>

//       {/* Plans Grid */}
//       {Array.isArray(plans) && plans.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
//           {plans.map((plan, index) => (
//             <motion.div
//               key={plan._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Card
//                 className={`cursor-pointer ${
//                   selectedPlan?._id === plan._id
//                     ? "border-blue-600 border-2"
//                     : "border-gray-200"
//                 }`}
//                 onClick={() => setSelectedPlan(plan)}
//               >
//                 <CardHeader>
//                   <CardTitle>{plan.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-col items-center space-y-2">
//                   <p className="text-gray-600">Duration: {plan.duration} days</p>
//                   <p className="text-lg font-bold text-gray-900">
//                     ₹{calculateDiscountedPrice(plan.price)}
//                     {validPromo && (
//                       <span className="text-sm text-green-600 ml-2 line-through">
//                         ₹{plan.price}
//                       </span>
//                     )}
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-600 text-center w-full mt-5">No plans available</p>
//       )}

//       {/* Promo Code */}
//       <motion.div
//         className="mt-10 w-full max-w-md bg-white shadow-md rounded-2xl p-6"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//           Apply Promo Code
//         </h2>
//         <div className="flex gap-3">
//           <Input
//             placeholder="Enter promo code"
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value)}
//           />
//           <Button onClick={handleApplyPromo}>Apply</Button>
//         </div>
//         {validPromo && (
//           <div className="flex items-center mt-3 text-green-600">
//             <CheckCircle className="w-4 h-4 mr-2" />
//             <p>{validPromo.code} applied successfully!</p>
//           </div>
//         )}
//         {validPromo === null && promoCode && (
//           <div className="flex items-center mt-3 text-red-600">
//             <XCircle className="w-4 h-4 mr-2" />
//             <p>Invalid promo code.</p>
//           </div>
//         )}
//       </motion.div>

//       {/* Buy Now */}
//       <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <Button
//           disabled={loading}
//           onClick={handlePurchase}
//           className="px-8 py-3 text-lg rounded-xl"
//         >
//           {loading ? "Processing..." : "Buy Now"}
//         </Button>
//       </motion.div>
//     </div>
//   );
// };

// export default Purchase;



 




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Purchase = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState(null);

  // Backend base URL
  const BASE_URL = 'http://localhost:8000';

  // Fetch plans and user data on component mount
  useEffect(() => {
    fetchPlans();
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    try {
      // Try different possible keys in localStorage
      const user = 
        JSON.parse(localStorage.getItem('user')) ||
        JSON.parse(localStorage.getItem('userData')) ||
        JSON.parse(localStorage.getItem('authUser'));
      
      console.log('User from localStorage:', user); // Debug log

      if (user) {
        // Try different possible ID fields
        const userID = user._id || user.id || user.userId || user.userID;
        if (userID) {
          setUserId(userID);
          console.log('User ID set:', userID); // Debug log
        } else {
          console.warn('User object found but no ID field:', user);
        }
      } else {
        console.warn('No user data found in localStorage');
        setError('Please login to purchase a plan');
      }
    } catch (err) {
      console.error('Error parsing user data:', err);
      setError('Please login to purchase a plan');
    }
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/plan/get`);
      if (response.data.success) {
        setPlans(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch plans');
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CORRECTED: Fixed endpoint from '/api/promo/validate' to '/api/promocode/validate'
  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setError('Please enter a promo code');
      return;
    }

    if (!selectedPlan) {
      setError('Please select a plan first');
      return;
    }

    try {
      setLoading(true);
      // ✅ CORRECT ENDPOINT
      const response = await axios.post(`${BASE_URL}/api/promocode/validate`, {
        code: promoCode,
        planId: selectedPlan._id
      });

      if (response.data.success) {
        setAppliedPromo(response.data.data);
        setError('');
        setSuccess('Promo code applied successfully!');
      } else {
        setError(response.data.message || 'Invalid promo code');
        setAppliedPromo(null);
        setSuccess('');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to validate promo code';
      setError(errorMessage);
      setAppliedPromo(null);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = (price) => {
    if (!appliedPromo) return 0;
    return (price * appliedPromo.discount) / 100;
  };

  const calculateFinalPrice = (price) => {
    const discount = calculateDiscount(price);
    return Math.max(0, price - discount);
  };

  const handlePurchase = async (plan) => {
    // Enhanced user check with better error messaging
    const user = 
      JSON.parse(localStorage.getItem('user')) ||
      JSON.parse(localStorage.getItem('userData')) ||
      JSON.parse(localStorage.getItem('authUser'));

    const currentUserId = user?._id || user?.id || user?.userId || user?.userID;

    if (!currentUserId) {
      setError('Please login to purchase a plan. Redirecting to login...');
      // Optional: Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/login'; // Change to your login route
      }, 2000);
      return;
    }

    if (!selectedPlan) {
      setError('Please select a plan first');
      return;
    }

    try {
      setLoading(true);
      const purchaseData = {
        userId: currentUserId, // Use the directly fetched user ID
        planId: plan._id,
        promoCodeId: appliedPromo?._id || null,
        originalPrice: plan.price,
        discountedPrice: calculateFinalPrice(plan.price),
        discountPercent: appliedPromo?.discount || 0,
        startDate: new Date(),
        expiryDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
        isActive: true,
        allCoursesUnlocked: true
      };

      console.log('Sending purchase data:', purchaseData); // Debug log

      const response = await axios.post(`${BASE_URL}/api/purchase/create`, purchaseData);

      if (response.data.success) {
        setSuccess('Purchase completed successfully!');
        setSelectedPlan(null);
        setAppliedPromo(null);
        setPromoCode('');
        setError('');
        
        // Optional: Redirect to success page or dashboard
        setTimeout(() => {
          window.location.href = '/dashboard'; // Change to your success route
        }, 2000);
      } else {
        setError(response.data.message || 'Purchase failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Purchase failed';
      setError(errorMessage);
      console.error('Purchase error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (days) => {
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''}`;
    if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? 's' : ''}`;
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setError('');
    setSuccess('');
    setAppliedPromo(null);
    setPromoCode('');
  };

  // Add a login prompt section if user is not authenticated
  if (!userId && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to purchase a plan and access all features.</p>
          <button
            onClick={() => window.location.href = '/login'} // Change to your login route
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  if (loading && plans.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Plan
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Unlock all courses and features with our flexible subscription plans
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}
        {success && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {success}
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan._id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                selectedPlan?._id === plan._id ? 'ring-4 ring-indigo-500 ring-opacity-50' : ''
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{formatDuration(plan.duration)} access</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 ml-2">one-time</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {['All courses unlocked', 'Practice tests', 'Progress tracking'].map((feat, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-600">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`mt-8 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    selectedPlan?._id === plan._id
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
                >
                  {selectedPlan?._id === plan._id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        {selectedPlan && (
          <div className="max-w-2xl mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="promo-code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter promo code"
                  className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  onClick={validatePromoCode}
                  disabled={loading || !promoCode.trim()}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Applying...' : 'Apply'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPlan.name}</h3>
                  <p className="text-gray-500">{formatDuration(selectedPlan.duration)} access</p>
                </div>
                <span className="text-lg font-semibold text-gray-900">${selectedPlan.price}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-green-600">Promo Code Applied</h3>
                    <p className="text-gray-500">{appliedPromo.code} - {appliedPromo.discount}% off</p>
                  </div>
                  <span className="text-lg font-semibold text-green-600">
                    -${calculateDiscount(selectedPlan.price).toFixed(2)}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-4 border-t border-gray-300">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Total Amount</h3>
                  <p className="text-gray-500">Inclusive of all taxes</p>
                </div>
                <div className="text-right">
                  {appliedPromo && (
                    <p className="text-sm text-gray-500 line-through">${selectedPlan.price}</p>
                  )}
                  <p className="text-2xl font-bold text-indigo-600">
                    ${calculateFinalPrice(selectedPlan.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePurchase(selectedPlan)}
              disabled={loading}
              className="mt-8 w-full py-4 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm">Secure payment · 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;