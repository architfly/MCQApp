import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// 🧹 Async thunk for deleting a promocode
export const DeletePromocode = createAsyncThunk(
  "promocode/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/promocode/update/${id}`);
      return response.data; // ✅ Return response (deleted promocode or success message)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to delete promocode";
      return rejectWithValue(message);
    }
  }
);

const DeletePromocodeSlice = createSlice({
  name: "DeletePromocode",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    deletedData: null,
    errorMessage: "",
  },

  reducers: {
    resetDeletePromocodeState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.deletedData = null;
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // 🟡 Pending
      .addCase(DeletePromocode.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      // 🟢 Fulfilled
      .addCase(DeletePromocode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedData = action.payload;
      })

      // 🔴 Rejected
      .addCase(DeletePromocode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetDeletePromocodeState } = DeletePromocodeSlice.actions;
export default DeletePromocodeSlice.reducer;
