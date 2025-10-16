
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

export const deleteTest=createAsyncThunk(
    "deleteTest",
    async({testId},{rejectWithValue}) =>{
        try{
            const response=await axiosInstance.delete(`/api/test/delete/${testId}`);
            return response.data;
        }
        catch(error){
            const message=error.response?.data?.message || error.message || "Failed to delete test";
            return rejectWithValue(message);
        }
    }
)


const deleteTestSlice=createSlice({
    name:"deleteTest",
    initialState:{
        isError:false,
        isLoading:false,
        deleteData:null,
        errorMessage:"",  
        isSuccess:false,
    },
    reducers:{},

    extraReducers:(builder)=>{      
        builder
        .addCase(deleteTest.pending,(state)=>{
            state.isLoading=true;   
            state.isError=false;
            state.isSuccess=false;
            state.errorMessage="";
        })

        .addCase(deleteTest.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;    
            state.isSuccess=true;
            state.deleteData=action.payload;
            state.errorMessage="";
        })
        .addCase(deleteTest.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true; 
            state.isSuccess=false;
            state.deleteData=null;
            state.errorMessage=action.payload || "Failed to delete test";
        })
    },
})  
export const {resetDeleteState}=deleteTestSlice.actions;
export default deleteTestSlice.reducer; 
