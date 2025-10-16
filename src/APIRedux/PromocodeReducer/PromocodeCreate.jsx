import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// 🧠 Async thunk for adding a new plan
export const AddPromocode = createAsyncThunk(
  "plan/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/promocode/create", formData);
      return response.data; // ✅ Return data here
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to add plan";
      return rejectWithValue(message);
    }
  }
);

const AddPromocodeSlice = createSlice({
  name: "AddPromocode",
  initialState: {
    isError: false,
    isLoading: false,
    addData: null,
    errorMessage: "",
    isSuccess: false,
  },

  reducers: {
    resetAddPromocodeState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.addData = null;
      state.errorMessage = "";
      state.isSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🟡 Pending
      .addCase(AddPromocode.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      // 🟢 Fulfilled
      .addCase(AddPromocode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addData = action.payload;
      })

      // 🔴 Rejected
      .addCase(AddPromocode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetAddPromocodeState } = AddPromocodeSlice.actions;
export default AddPromocodeSlice.reducer;
