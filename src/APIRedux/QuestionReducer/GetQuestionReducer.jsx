// src/redux/reducers/GetQuestionReducer.jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// ✅ Get all questions
export const getQuestion = createAsyncThunk(
  "question/getQuestion",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/test/get/${testId}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch questions";
      return rejectWithValue(message);
    }
  }
);

const getQuestionSlice = createSlice({
  name: "getQuestion",
  initialState: {
    isError: false,
    isLoading: false,
    data: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetGetQuestionState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.errorMessage = "";
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.data = null;
        state.errorMessage = action.payload || "Failed to fetch questions";
      });
  },
});

export const { resetGetQuestionState } = getQuestionSlice.actions;
export default getQuestionSlice.reducer;
