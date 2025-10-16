import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

export const getUserAttempt =createAsyncThunk (
    "getUserAttempt/add",

    async({testId,userId},{rejectWithValue})=>{
        try{
            const response=await axiosInstance.get(`/api/test/getTest/${testId}/${userId}`)
            return response.data;
        }
        catch(error){
             const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit user attempt";
      return rejectWithValue(message);
        }
    }
)

const getUserAttemptSlice=createSlice({
    name:"getUserAttempt",
    initialState:{
        isError:false,
         isLoading: false,
    getData: null,
    errorMessage: "",
    isSuccess: false,
    },

    reducers:{},

    extraReducers:(builder) =>{
        builder
          .addCase(getUserAttempt.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.errorMessage = "";
              })
              .addCase(getUserAttempt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getData = action.payload;
                state.errorMessage = "";
              })
              .addCase(getUserAttempt.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.getData = null;
                state.errorMessage = action.payload || "Failed to submit user attempt";
              });

    }

})

export default getUserAttemptSlice.reducer;