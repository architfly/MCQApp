import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// ✅ Get all courses
export const getCourse = createAsyncThunk(
  "course/getCourse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/course/getAll");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch courses";
      return rejectWithValue(message);
    }
  }
);

const getCourseSlice = createSlice({
  name: "getCourse",
  initialState: {
    isError: false,
    isLoading: false,
    data: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetGetCourseState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.errorMessage = "";
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.data = null;
        state.errorMessage = action.payload || "Failed to fetch courses";
      });
  },
});

export const { resetGetCourseState } = getCourseSlice.actions;
export default getCourseSlice.reducer;
