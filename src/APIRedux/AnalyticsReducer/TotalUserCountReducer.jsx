 


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// Async thunk
export const totalUserCount = createAsyncThunk(
  "analytics/totalUserCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/analytics/totalUser"); // GET request
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch totalUserCount";
      return rejectWithValue(message);
    }
  }
);

// Slice
const totalUserCountSlice = createSlice({
  name: "totalUserCount",
  initialState: {
    isError: false,
    isLoading: false,
    data: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resettotalUserCountState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalUserCount.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(totalUserCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.errorMessage = "";
      })
      .addCase(totalUserCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.data = null;
        state.errorMessage = action.payload   || "Failed to fetch totalUserCount";
      });
  },
});

export const { resettotalUserCountState } = totalUserCountSlice.actions;
export default totalUserCountSlice.reducer;
