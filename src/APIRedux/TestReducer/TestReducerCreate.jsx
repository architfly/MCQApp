
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// ===== Thunk: Create Test =====
export const createTest = createAsyncThunk(
  "createTest",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/test/create", formData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to create test";
      return rejectWithValue(message);
    }
  }
);

// ===== Slice =====
const createTestSlice = createSlice({
  name: "createTest",
  initialState: {
    isError: false,
    isLoading: false,
    testData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetCreateTestState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.testData = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.testData = action.payload;
        state.errorMessage = "";
      })
      .addCase(createTest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.testData = null;
        state.errorMessage = action.payload || "Failed to create test";
      });
  },
});

// ===== Export actions & reducer =====
export const { resetCreateTestState } = createTestSlice.actions;
export default createTestSlice.reducer;
