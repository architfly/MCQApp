import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// 🧠 Async thunk for fetching all promocodes
export const GetPromocodes = createAsyncThunk(
  "promocode/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/promocode/getAll"); // adjust endpoint
      return response.data; // should return { success, data }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch promocodes";
      return rejectWithValue(message);
    }
  }
);

const GetPromocodesSlice = createSlice({
  name: "GetPromocodes",
  initialState: {
    getpromocodes: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    resetGetPromocodesState: (state) => {
      state.getpromocodes = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetPromocodes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(GetPromocodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;state.getpromocodes = Array.isArray(action.payload)
  ? action.payload          // Admin API returns array
  : action.payload?.data || []; // User API returns { data: [...] }

      })
      .addCase(GetPromocodes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetGetPromocodesState } = GetPromocodesSlice.actions;
export default GetPromocodesSlice.reducer;
