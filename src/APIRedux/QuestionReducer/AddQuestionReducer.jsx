// src/Redux/Reducers/AddQuestionReducer.jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// ✅ Async thunk for adding question with proper FormData headers
export const addQuestion = createAsyncThunk(
  "addQuestion",
  async ({ testId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/test/addQuestion/${testId}`, 
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
        "Failed to add question";
      return rejectWithValue(message);
    }
  }
);

// ✅ Slice (rest remains the same)
const addQuestionSlice = createSlice({
  name: "addQuestion",
  initialState: {
    isError: false,
    isLoading: false,
    addData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetAddQuestionState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.addData = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuestion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addData = action.payload;
        state.errorMessage = "";
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.addData = null;
        state.errorMessage = action.payload || "Failed to add question";
      });
  },
});

export const { resetAddQuestionState } = addQuestionSlice.actions;
export default addQuestionSlice.reducer;