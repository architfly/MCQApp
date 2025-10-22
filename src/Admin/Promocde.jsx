import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Copy, Calendar, Percent } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { AddPromocode } from "../APIRedux/PromocodeReducer/PromocodeCreate";
import { GetPromocodes } from "../APIRedux/PromocodeReducer/PromocodeGetAll";
import { EditPromocode } from "../APIRedux/PromocodeReducer/PromocodeEdit";
import { DeletePromocode } from "../APIRedux/PromocodeReducer/PromocodeDelete";

// Mock Redux actions - replace with your actual actions
// import { CreatePromocode, GetPromocodes, UpdatePromocode, DeletePromocode } from "../APIRedux/PromocodeReducer";

const Promocde = () => {
  const dispatch=useDispatch();
  const [promocodes, setPromocodes] = useState([]);
  const [editPromocode, setEditPromocode] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {getpromocodes,isError,isLoading} =useSelector((state)=>state.GetPromocodes)

  useEffect(()=>{
    dispatch(GetPromocodes())
  },[dispatch])



  const [newPromocode, setNewPromocode] = useState({
    code: "",
    discount: 10,
    validTill: "",
    isActive: true
  });

  const [editData, setEditData] = useState({
    code: "",
    discount: 10,
    validTill: "",
    isActive: true
  });

  // Mock dispatch - replace with your actual Redux setup
  // const dispatch = useDispatch();
  // const { promocodes: reduxPromocodes, isLoading } = useSelector((state) => state.promocodes);

  // Mock data - remove when using real API
  const mockPromocodes = [
    {
      _id: "1",
      code: "WELCOME20",
      discount: 20,
      validTill: "2024-12-31",
      isActive: true
    },
    {
      _id: "2",
      code: "SUMMER15",
      discount: 15,
      validTill: "2024-08-31",
      isActive: true
    },
    {
      _id: "3",
      code: "OLD50",
      discount: 50,
      validTill: "2024-06-30",
      isActive: false
    }
  ];

  useEffect(() => {
    // Replace with actual API call
    // dispatch(GetPromocodes());
    setPromocodes(mockPromocodes);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPromocode(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPromocode(prev => ({ ...prev, code: result }));
  };

  const handleAddPromocode = async () => {
    if (!newPromocode.code || !newPromocode.discount || !newPromocode.validTill) {
      toast.warning("Please fill all fields correctly!");
      return;
    }

    if (newPromocode.discount <= 0 || newPromocode.discount > 100) {
      toast.warning("Discount must be between 1 and 100!");
      return;
    }

    setLoading(true);
    try {
      // Replace with actual API call
       await dispatch(AddPromocode(newPromocode)).unwrap();
      
      // Mock success
      const addedPromocode = {
        ...newPromocode,
        _id: Date.now().toString(),
        validTill: newPromocode.validTill
      };
      
      setPromocodes(prev => [...prev, addedPromocode]);
      setNewPromocode({ code: "", discount: 10, validTill: "", isActive: true });
      setShowForm(false);
      toast.success("Promocode created successfully!");
    } catch (error) {
      console.log("Failed to create promocode", error);
      toast.error("Failed to create promocode");
    } finally {
      setLoading(false);
    }
  };

 const handleUpdatePromocode = async () => {
  if (!editData.code || !editData.discount || !editData.validTill) {
    toast.warning("Please fill all fields correctly!");
    return;
  }

  if (editData.discount <= 0 || editData.discount > 100) {
    toast.warning("Discount must be between 1 and 100!");
    return;
  }

  setLoading(true);
  try {
    // Make sure the data is properly formatted
    const updateData = {
      code: editData.code,
      discount: Number(editData.discount),
      validTill: editData.validTill,
      isActive: editData.isActive
    };

    await dispatch(EditPromocode({ 
  id: editPromocode._id, 
  formData: updateData     // ✅ key name must match thunk param
})).unwrap();

    
    // Refresh the list from server
    dispatch(GetPromocodes());
    
    setEditPromocode(null);
    setEditData({ code: "", discount: 10, validTill: "", isActive: true });
    toast.success("Promocode updated successfully!");
  } catch (error) {
    console.log("Failed to update promocode", error);
    toast.error("Failed to update promocode");
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id, code) => {
    // const result = await Swal.fire({
    //   title: 'Delete Promocode?',
    //   text: `Are you sure you want to delete promocode "${code}"?`,
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#d33',
    //   cancelButtonColor: '#3085d6',
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'Cancel',
    //   reverseButtons: true
    // });

    
      try {
        // Replace with actual API call
         await dispatch(DeletePromocode(id)).unwrap();
        
        // Mock delete
        setPromocodes(prev => prev.filter(promo => promo._id !== id));

        await dispatch(GetPromocodes())
        toast.success("Promocode deleted successfully!");
      } catch (error) {
        console.log("Error in delete", error);
        toast.error("Failed to delete promocode");
      }
    
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.info(`Copied: ${code}`);
  };

  const handleEditClick = (promocode) => {
    setEditPromocode(promocode);
    setEditData({
      code: promocode.code,
      discount: promocode.discount,
      validTill: promocode.validTill.split('T')[0], // Format for date input
      isActive: promocode.isActive
    });
  };

  const isExpired = (validTill) => {
    return new Date(validTill) < new Date();
  };

  const getStatusBadge = (promocode) => {
    if (!promocode.isActive) {
      return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Inactive</span>;
    }
    if (isExpired(promocode.validTill)) {
      return <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">Expired</span>;
    }
    return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Active</span>;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Promocodes</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Promocode
          </button>
        </div>

        {/* Add Promocode Dialog */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Create New Promocode</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="code"
                      value={newPromocode.code}
                      onChange={handleChange}
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 uppercase"
                      maxLength={20}
                    />
                    <button
                      type="button"
                      onClick={generateRandomCode}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="discount"
                      value={newPromocode.discount}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      className="w-full border border-gray-300 px-3 py-2 pl-10 rounded focus:outline-none focus:border-blue-500"
                    />
                    <Percent className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Till
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="validTill"
                      value={newPromocode.validTill}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 px-3 py-2 pl-10 rounded focus:outline-none focus:border-blue-500"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={newPromocode.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Active</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleAddPromocode}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create"}
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

        {/* Edit Promocode Dialog */}
        {editPromocode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Edit Promocode</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={editData.code}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="discount"
                      value={editData.discount}
                      onChange={handleEditChange}
                      min="1"
                      max="100"
                      className="w-full border border-gray-300 px-3 py-2 pl-10 rounded focus:outline-none focus:border-blue-500"
                    />
                    <Percent className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Till
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="validTill"
                      value={editData.validTill}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 px-3 py-2 pl-10 rounded focus:outline-none focus:border-blue-500"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={editData.isActive}
                    onChange={handleEditChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Active</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleUpdatePromocode}
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={() => setEditPromocode(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Promocodes Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Promo Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Valid Till</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getpromocodes?.data?.map((promocode) => (
                <tr key={promocode._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {promocode.code}
                      </span>
                      <button
                        onClick={() => handleCopyCode(promocode.code)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy code"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <Percent className="w-4 h-4" />
                      {promocode.discount}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(promocode.validTill).toLocaleDateString()}
                    {isExpired(promocode.validTill) && (
                      <span className="ml-2 text-xs text-orange-600">(Expired)</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(promocode)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(promocode)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(promocode._id, promocode.code)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {promocodes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No promocodes available. Create your first promocode to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Promocde;