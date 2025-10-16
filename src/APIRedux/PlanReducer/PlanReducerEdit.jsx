import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// ✏️ Async thunk for updating an existing plan
export const UpdatePlan = createAsyncThunk(
  "plan/update",
  async ({ planId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/plan/plan/${planId}`, updatedData);
      return response.data; // ✅ Return updated plan
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to update plan";
      return rejectWithValue(message);
    }
  }
);

const UpdatePlanSlice = createSlice({
  name: "UpdatePlan",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    updatedPlan: null,
    errorMessage: "",
  },

  reducers: {
    resetUpdatePlanState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.updatedPlan = null;
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // 🟡 Pending
      .addCase(UpdatePlan.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      // 🟢 Fulfilled
      .addCase(UpdatePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedPlan = action.payload;
      })

      // 🔴 Rejected
      .addCase(UpdatePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpdatePlanState } = UpdatePlanSlice.actions;
export default UpdatePlanSlice.reducer;
