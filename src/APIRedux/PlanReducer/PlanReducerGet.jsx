import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// Async thunk to fetch all plans
export const GetAllPlans = createAsyncThunk(
  "plan/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/plan/get");
      return response.data; 
      // Expected response: either { success, data: [...] } (user) 
      // or [...] (admin)
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
      .addCase(GetAllPlans.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(GetAllPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        
        // Normalize payload for both admin & user panels
        state.plans1 = Array.isArray(action.payload)
          ? action.payload          // Admin API returns array
          : action.payload?.data || []; // User API returns { data: [...] }
      })
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
