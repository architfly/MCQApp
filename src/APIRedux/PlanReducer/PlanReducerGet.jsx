import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// 🔹 Async thunk to fetch all plans
export const GetAllPlans = createAsyncThunk(
  "plan/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/plan/get");
      return response.data; // ✅ Return response from server
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch plans";
      return rejectWithValue(message);
    }
  }
);

const GetAllPlansSlice = createSlice({
  name: "GetAllPlans",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    plans1: [],
    errorMessage: "",
  },

  reducers: {
    resetGetPlansState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.plans1 = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // 🟡 Pending
      .addCase(GetAllPlans.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      // 🟢 Fulfilled
      .addCase(GetAllPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.plans1 = action.payload || []; // ✅ server should send { success, data: [...] }
      })

      // 🔴 Rejected
      .addCase(GetAllPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetGetPlansState } = GetAllPlansSlice.actions;
export default GetAllPlansSlice.reducer;
