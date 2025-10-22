
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetAllPlans } from "../../APIRedux/PlanReducer/PlanReducerGet";
import { GetPromocodes } from "../../APIRedux/PromocodeReducer/PromocodeGetAll";

const Purchase = () => {
  const dispatch = useDispatch();

  // Redux state
  const plans = useSelector((state) => state.GetAllPlans.plans1);
  const plansLoading = useSelector((state) => state.GetAllPlans.isLoading);
  const plansError = useSelector((state) => state.GetAllPlans.isError);

  const promocodes = useSelector((state) => state.GetPromocodes.getpromocodes);
  const promoLoading = useSelector((state) => state.GetPromocodes.isLoading);
  const promoError = useSelector((state) => state.GetPromocodes.isError);

  // Local state
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch plans & promocodes
  useEffect(() => {
    dispatch(GetAllPlans());
    dispatch(GetPromocodes());
  }, [dispatch]);

  // Get user ID from localStorage
  useEffect(() => {
    try {
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("userData")) ||
        JSON.parse(localStorage.getItem("authUser"));
      const id = user?._id || user?.id || user?.userId || user?.userID;
      if (id) setUserId(id);
    } catch {
      setError("Please login to purchase a plan");
    }
  }, []);

  // Select plan
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setAppliedPromo(null);
    setPromoCode("");
    setError("");
    setSuccess("");
  };

  // Promo code validation (frontend only)
  const validatePromoCode = () => {
    if (!promoCode.trim()) return setError("Please enter a promo code");
    if (!selectedPlan) return setError("Please select a plan first");

    setLoading(true);

    // Find promo code from Redux store
   const promo = Array.isArray(promocodes)
  ? promocodes.find(
      (p) => p.code.toUpperCase() === promoCode.toUpperCase()
    )
  : null;


    if (!promo) {
      setAppliedPromo(null);
      setError("Invalid promo code");
      setSuccess("");
      setLoading(false);
      return;
    }

    // Optional: check if promo is for specific plan
    if (promo.planId && promo.planId !== selectedPlan._id) {
      setAppliedPromo(null);
      setError("Promo code not valid for this plan");
      setSuccess("");
      setLoading(false);
      return;
    }

    setAppliedPromo(promo);
    setError("");
    setSuccess("Promo code applied successfully!");
    setLoading(false);
  };

  // Price calculations
  const calculateDiscount = (price) =>
    appliedPromo ? (price * appliedPromo.discount) / 100 : 0;
  const calculateFinalPrice = (price) =>
    Math.max(0, price - calculateDiscount(price));

  // Purchase handler
  const handlePurchase = async () => {
    if (!userId) {
      setError("Please login to purchase a plan. Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 2000);
      return;
    }
    if (!selectedPlan) return setError("Please select a plan first");

    try {
      setLoading(true);
      const purchaseData = {
        userId,
        planId: selectedPlan._id,
        promoCodeId: appliedPromo?._id || null,
        originalPrice: selectedPlan.price,
        discountedPrice: calculateFinalPrice(selectedPlan.price),
        discountPercent: appliedPromo?.discount || 0,
        startDate: new Date(),
        expiryDate: new Date(
          Date.now() + selectedPlan.duration * 24 * 60 * 60 * 1000
        ),
        isActive: true,
        allCoursesUnlocked: true,
      };

      const response = await fetch("http://localhost:8000/api/purchase/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });
      const data = await response.json();

      if (data.success) {
        setSuccess("Purchase completed successfully!");
        setSelectedPlan(null);
        setAppliedPromo(null);
        setPromoCode("");
        setError("");
        setTimeout(() => (window.location.href = "/dashboard"), 2000);
      } else {
        setError(data.message || "Purchase failed");
      }
    } catch (err) {
      setError("Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  // Format duration
  const formatDuration = (days) => {
    if (days < 30) return `${days} day${days !== 1 ? "s" : ""}`;
    if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) !== 1 ? "s" : ""}`;
    return `${Math.floor(days / 365)} year${Math.floor(days / 365) !== 1 ? "s" : ""}`;
  };

  if (plansLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (plansError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load plans. Try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Choose Your Plan</h1>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans && plans.length > 0 ? (
            plans.map((plan) => (
              <div
                key={plan._id}
                className={`bg-white p-6 rounded-xl shadow hover:shadow-lg transition ${
                  selectedPlan?._id === plan._id ? "ring-4 ring-indigo-500" : ""
                }`}
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>
             <p className="text-gray-500">
  {plan.duration}{" "}
  {plan.duration > 1 ? "Months" : "Month"} access
</p>

                <p className="text-2xl font-bold mt-4">₹ {plan.price}</p>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`mt-6 w-full py-2 rounded-md text-white ${
                    selectedPlan?._id === plan._id ? "bg-green-600" : "bg-indigo-600"
                  } hover:opacity-90`}
                >
                  {selectedPlan?._id === plan._id ? "Selected" : "Select Plan"}
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No plans available.</p>
          )}
        </div>

        {/* Order summary */}
        {selectedPlan && (
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter promo code"
                className="flex-1 border p-2 rounded"
              />
              <button
                onClick={validatePromoCode}
                disabled={loading || !promoCode.trim()}
                className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? "Applying..." : "Apply"}
              </button>
            </div>

            <div className="flex justify-between mb-2">
              <span>{selectedPlan.name}</span>
              <span>${selectedPlan.price}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>
                  {appliedPromo.code} - {appliedPromo.discount}% off
                </span>
                <span>- ${calculateDiscount(selectedPlan.price).toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>${calculateFinalPrice(selectedPlan.price).toFixed(2)}</span>
            </div>

            <button
              onClick={handlePurchase}
              disabled={loading}
              className="mt-6 w-full py-3 rounded-md text-white bg-indigo-600 hover:opacity-90"
            >
              {loading ? "Processing..." : "Complete Purchase"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;
