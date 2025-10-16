import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

export const totalTestCount=createAsyncThunk(
    "analytics/totalTestCount",
    async(__,{rejectWithValue}) =>{
        try{
            const response=await axiosInstance.get("/api/analytics/totalTest")
            return response.data;
        }
        catch(error){
             const message =
        error.response?.data?.message || error.message || "Failed to fetch totalUserCount";
      return rejectWithValue(message);
        }
    }
)

const totalTestCountSlice=createSlice({
    name:"totalUserCount",
    initialState:{
        isError:false,
        isLoading:false,
        testData:null,
        errorMessage:"",
        isSuccess:false,
    },
    reducers:{},

    extraReducers:(builder) =>{
        builder
            .addCase(totalTestCount.pending, (state) =>{
                state.isLoading=true;
                state.isError=false,
                state.isSuccess=false,
                state.errorMessage="";
            })

            .addCase(totalTestCount.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.testData=action.payload;
                state.errorMessage="";
            })

            .addCase(totalTestCount.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.data=null;
                state.errorMessage=action.payload || "Failed to fecth to total"
            })
    }
})

export default totalTestCountSlice.reducer;