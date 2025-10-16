import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// 🧩 Async thunk for deleting a plan
export const DeletePlan = createAsyncThunk(
  "plan/delete",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/plan/plan/${planId}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to delete plan";
      return rejectWithValue(message);
    }
  }
);

const DeletePlanSlice = createSlice({
  name: "DeletePlan",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    deletedPlan: null,
    errorMessage: "",
  },

  reducers: {
    resetDeletePlanState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.deletedPlan = null;
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // 🟡 Pending
      .addCase(DeletePlan.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      // 🟢 Fulfilled
      .addCase(DeletePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedPlan = action.payload;
      })

      // 🔴 Rejected
      .addCase(DeletePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetDeletePlanState } = DeletePlanSlice.actions;
export default DeletePlanSlice.reducer;
