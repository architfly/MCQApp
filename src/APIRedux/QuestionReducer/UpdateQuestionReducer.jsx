import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// ✅ Async thunk for updating a question
export const updateQuestion = createAsyncThunk(
  "updateQuestion",
  async ({ testId, questionId, formData }, { rejectWithValue }) => {
    try {
      // Call the new endpoint
      const response = await axiosInstance.post(
        `/api/test/editQuestion/${testId}/${questionId}`,
        formData
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update question";
      return rejectWithValue(message);
    }
  }
);

// ✅ Slice
const updateQuestionSlice = createSlice({
  name: "updateQuestion",
  initialState: {
    isError: false,
    isLoading: false,
    updateData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetUpdateQuestionState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.updateData = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateQuestion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateData = action.payload;
        state.errorMessage = "";
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateData = null;
        state.errorMessage = action.payload || "Failed to update question";
      });
  },
});

// ✅ Export
export const { resetUpdateQuestionState } = updateQuestionSlice.actions;
export default updateQuestionSlice.reducer;





 