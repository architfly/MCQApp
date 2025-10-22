import React, { useEffect, useState } from "react";
import { Crown, Plus, Trash2, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AddPlan } from "../APIRedux/PlanReducer/PlanReducerCreate";
import { GetAllPlans } from "../APIRedux/PlanReducer/PlanReducerGet";
import { UpdatePlan } from "../APIRedux/PlanReducer/PlanReducerEdit";
import { DeletePlan } from "../APIRedux/PlanReducer/PlanReducerDelete";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [editPlan, setEditPlan] = useState(null);
  const [editData, setEditData] = useState({ name: "", duration: 1, price: 0 });
  const [showForm, setShowForm] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: "", duration: 1, price: 0 });

  const dispatch = useDispatch();

  // ✅ Updated selector
  const { plans1, isLoading, isError } = useSelector((state) => state.GetAllPlans);

  useEffect(() => {
    dispatch(GetAllPlans());
  }, [dispatch]);

  const showSuccessToast = (message) => {
    toast.success(message, { position: "top-right", autoClose: 3000 });
  };
  const showErrorToast = (message) => {
    toast.error(message, { position: "top-right", autoClose: 3000 });
  };
  const showWarningToast = (message) => {
    toast.warning(message, { position: "top-right", autoClose: 3000 });
  };

  const handleUpdatePlan = async () => {
    if (!editData.name || editData.price <= 0) {
      showWarningToast("Please fill all fields correctly!");
      return;
    }

    try {
      await dispatch(UpdatePlan({ planId: editPlan._id, updatedData: editData })).unwrap();
      showSuccessToast("Plan updated successfully!");
      setEditPlan(null);
      setEditData({ name: "", duration: 1, price: 0 });
      dispatch(GetAllPlans());
    } catch (error) {
      console.log("Handle in update error", error);
      showErrorToast("Failed to update plan");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: name === "name" ? value : Number(value) }));
  };

  const handleAddPlan = async () => {
    if (!newPlan.name || newPlan.price <= 0) {
      showWarningToast("Please fill all fields correctly!");
      return;
    }

    try {
      await dispatch(AddPlan(newPlan));
      const addedPlan = { ...newPlan, id: Date.now() };
      setPlans([...plans, addedPlan]);
      setNewPlan({ name: "", duration: 1, price: 0 });
      setShowForm(false);
      showSuccessToast("Plan added successfully!");
      dispatch(GetAllPlans());
    } catch (error) {
      console.log("Failed to add plan", error);
      showErrorToast("Failed to add plan");
    }
  };

  const handleDelete = async (id, planName) => {
    try {
      await dispatch(DeletePlan(id)).unwrap();
      showSuccessToast("Plan deleted successfully!");
      dispatch(GetAllPlans());
    } catch (error) {
      console.log("error in delete", error);
      showErrorToast("Failed to delete plan");
    }
  };

  const handleEditClick = (plan) => {
    setEditPlan(plan);
    setEditData({ name: plan.name, duration: plan.duration, price: plan.price });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Plans</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Plan
          </button>
        </div>

        {/* Add Plan Dialog */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Add New Plan</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newPlan.name}
                    onChange={handleChange}
                    placeholder="Plan Name"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={newPlan.duration}
                    onChange={handleChange}
                    placeholder="Duration (months)"
                    min="1"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newPlan.price}
                    onChange={handleChange}
                    placeholder="Price (₹)"
                    min="0"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleAddPlan}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Plan Dialog */}
        {editPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Edit Plan</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                  <input
                    type="number"
                    name="duration"
                    value={editData.duration}
                    onChange={(e) => setEditData({ ...editData, duration: Number(e.target.value) })}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleUpdatePlan} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Update
                  </button>
                  <button
                    onClick={() => { setEditPlan(null); setEditData({ name: "", duration: 1, price: 0 }); }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plans Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plan Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* ✅ Updated map to plans1 directly */}
              {plans1?.map((plan, id) => (
                <tr key={id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium text-gray-900">{plan.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{plan.duration} {plan.duration === 1 ? "month" : "months"}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">₹ {plan.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => handleEditClick(plan)}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(plan._id, plan.name)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {plans1?.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No plans available. Add a new plan to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
