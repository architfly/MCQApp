// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../AxiosInstance";

// export const validatePromoCode = createAsyncThunk(
//     "promocode/validate",
//     async (FormData, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.post("/api/promocode/validate",
//                 formData);
//                 return response.data;
            
//         } catch (error) {
//             const message = error.response?.message || error.message || "Failed to add Plan";
//             return rejectWithValue(message);
//         }
//     }
// );

// const ValidatePromocodeSlice = createSlice({
//     name: "ValidatePromocode",
//     initialState: {
//         isError: false,
//         isLoading: false,
//         addData: null,
//         errorMessage:"",
//         isSuccess: false,
//     },

//     reducers: {
//         resetValidatePromocodeState: (state) => {
//             state.isError = false;
//             state.isLoading = false;
//             state.addData = null;
//             state.errorMessage = "";
//             state.isSuccess = false;
//         },
//     },

//     extraReducers: (builder)=> {
//         builder
//         .addCase(ValidatePromocode.pending, (state)=> {
//             state.isLoading = true;
//             state.isError =false;
//             state.isSuccess = false;
//             state.errorMessage = "";
//         })

//         .addCase(ValidatePromocod.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.isSuccess = true;
//             state.isError = false;
//             state.validateData = action.payload;
//         })

//         .addCase(ValidatePromocode.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//             state.isSuccess = false;
//             state.errorMessage = action.payload || "Something went wrong";
//         });
//     },
// });


// export const {resetValidatePromocodeState } = ValidatePromocodeSlice.actions;
// export default ValidatePromocodeSlice.reducer;