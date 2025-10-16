import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// 🧠 Async thunk for editing (updating) a promocode
export const EditPromocode = createAsyncThunk(
  "promocode/edit",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/promocode/update/${id}`, formData);
      return response.data; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to update promocode";
      return rejectWithValue(message);
    }
  }
);

const EditPromocodeSlice = createSlice({
  name: "EditPromocode",
  initialState: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    updatedData: null,
  },
  reducers: {
    resetEditPromocodeState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.updatedData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 Pending
      .addCase(EditPromocode.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      // 🟢 Fulfilled
      .addCase(EditPromocode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedData = action.payload;
      })

      // 🔴 Rejected
      .addCase(EditPromocode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetEditPromocodeState } = EditPromocodeSlice.actions;
export default EditPromocodeSlice.reducer;
