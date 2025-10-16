import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// 🔹 Async thunk for updating test
export const updateTest = createAsyncThunk(
  "test/updateTest",
  async ({ testId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/test/testUpdate/${testId}`, formData); 
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update test";
      return rejectWithValue(message);
    }
  }
);

// 🔹 Slice for updateTest
const updateTestSlice = createSlice({
  name: "updateTest",
  initialState: {
    isError: false,
    isLoading: false,
    updateData: null,
    errorMessage: "",
    isSuccessful: false,
  },
  reducers: {
    resetUpdateState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.updateData = null;
      state.errorMessage = "";
      state.isSuccessful = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccessful = false;
        state.errorMessage = "";
      })
      .addCase(updateTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessful = true;
        state.updateData = action.payload;
      })
      .addCase(updateTest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetUpdateState } = updateTestSlice.actions;
export default updateTestSlice.reducer;
