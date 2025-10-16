import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// 🧠 Async thunk for adding a new plan
export const AddPlan = createAsyncThunk(
  "plan/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/plan/create", formData);
      return response.data; // ✅ Return data here
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to add plan";
      return rejectWithValue(message);
    }
  }
);

const AddPlanSlice = createSlice({
  name: "AddPlan",
  initialState: {
    isError: false,
    isLoading: false,
    addData: null,
    errorMessage: "",
    isSuccess: false,
  },

  reducers: {
    resetAddPlanState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.addData = null;
      state.errorMessage = "";
      state.isSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🟡 Pending
      .addCase(AddPlan.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      // 🟢 Fulfilled
      .addCase(AddPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addData = action.payload;
      })

      // 🔴 Rejected
      .addCase(AddPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetAddPlanState } = AddPlanSlice.actions;
export default AddPlanSlice.reducer;
