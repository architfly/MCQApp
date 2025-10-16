import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// Async thunk for updating a course
export const updateCourse = createAsyncThunk(
  "updateCourse",
  async ({ courseId, courseData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/course/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to update course";
      return rejectWithValue(message);
    }
  }
);

const updateCourseSlice = createSlice({
  name: "updateCourse",
  initialState: {
    isError: false,
    isLoading: false,
    updateData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetUpdateCourseState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.updateData = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateData = action.payload;
        state.errorMessage = "";
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateData = null;
        state.errorMessage = action.payload || "Failed to update course";
      });
  },
});

export const { resetUpdateCourseState } = updateCourseSlice.actions;
export default updateCourseSlice.reducer;
