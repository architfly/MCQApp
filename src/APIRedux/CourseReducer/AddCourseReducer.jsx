import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

export const addCourse = createAsyncThunk(
  "addCourse",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/course/course", formData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to add course";
      return rejectWithValue(message);
    }
  }
);

const addCourseSlice = createSlice({
  name: "addCourse",
  initialState: {
    isError: false,
    isLoading: false,
    addData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetAddCourseState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.addData = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addData = action.payload;
        state.errorMessage = "";
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.addData = null;
        state.errorMessage = action.payload || "Failed to add course";
      });
  },
});

export const { resetAddCourseState } = addCourseSlice.actions;
export default addCourseSlice.reducer;
