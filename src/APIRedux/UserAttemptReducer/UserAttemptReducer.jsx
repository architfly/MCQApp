import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

export const addUserAttempt = createAsyncThunk(
  "userAttempted/add",
  async ({ testId, answers }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/test/userSelect/${testId}`, {
        answers,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit user attempt";
      return rejectWithValue(message);
    }
  }
);

const addUserAttemptSlice = createSlice({
  name: "userAttempted",
  initialState: {
    isError: false,
    isLoading: false,
    userData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserAttempt.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addUserAttempt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userData = action.payload;
        state.errorMessage = "";
      })
      .addCase(addUserAttempt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.userData = null;
        state.errorMessage = action.payload || "Failed to submit user attempt";
      });
  },
});

export default addUserAttemptSlice.reducer;
