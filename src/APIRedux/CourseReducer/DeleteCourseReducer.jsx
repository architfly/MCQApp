import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// ✅ Async thunk for deleting a course
export const deleteCourse = createAsyncThunk(
  "deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/course/${courseId}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to delete course";
      return rejectWithValue(message);
    }
  }
);

// ✅ Slice
const deleteCourseSlice = createSlice({
  name: "deleteCourse",
  initialState: {
    isError: false,
    isLoading: false,
    deleteData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetDeleteCourseState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.deleteData = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteData = action.payload;
        state.errorMessage = "";
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteData = null;
        state.errorMessage = action.payload || "Failed to delete course";
      });
  },
});

export const { resetDeleteCourseState } = deleteCourseSlice.actions;
export default deleteCourseSlice.reducer;
