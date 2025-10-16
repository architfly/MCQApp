import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

export const bulkQuestion = createAsyncThunk(
  "bulkQuestion",
  async ({ testId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/test/addBulkQuestion/${testId}`, // ✅ Correct endpoint
        formData,
         {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to upload bulk questions";
      return rejectWithValue(message);
    }
  }
);

const bulkQuestionSlice = createSlice({
  name: "bulkQuestion",
  initialState: {
    isError: false,
    isLoading: false,
    addData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetbulkQuestionState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.addData = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bulkQuestion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(bulkQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addData = action.payload;
        state.errorMessage = "";
      })
      .addCase(bulkQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.addData = null;
        state.errorMessage = action.payload || "Failed to upload bulk questions";
      });
  },
});

export const { resetbulkQuestionState } = bulkQuestionSlice.actions; // ✅ fixed
export default bulkQuestionSlice.reducer;
