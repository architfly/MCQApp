import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// ✅ Async thunk for deleting question
export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async ({ testId, questionId }, { rejectWithValue }) => {
    try {
      // FIX: endpoint matched with backend
      const response = await axiosInstance.delete(
        `api/test/deleteQuestion/${testId}/${questionId}`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete question";
      return rejectWithValue(message);
    }
  }
);

// ✅ Slice
const deleteQuestionSlice = createSlice({
  name: "deleteQuestion",
  initialState: {
    isError: false,
    isLoading: false,
    deleteData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetDeleteQuestionState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.deleteData = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteData = action.payload;
        state.errorMessage = "";
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteData = null;
        state.errorMessage = action.payload || "Failed to delete question";
      });
  },
});

export const { resetDeleteQuestionState } = deleteQuestionSlice.actions;
export default deleteQuestionSlice.reducer;
