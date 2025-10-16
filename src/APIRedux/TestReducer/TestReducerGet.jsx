
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";


export const getTests=createAsyncThunk(
    "getTests",
    async(_,{rejectWithValue})=>{
        try{
            const response=await axiosInstance.get("/api/test/getAll");
            return response.data.data;
        }
        catch(error){   
            const message=error.response?.data?.message || error.message || "Failed to fetch tests";
            return rejectWithValue(message);
        }
    }
)


const getTestSlice=createSlice({
    name:"getTests",
    initialState:{
        isError:false,
        isLoading:false,
        getData:null,
        errorMessage:"",
        isSuccess:false,
    },
    reducers:{},

    extraReducers:(builder)=>{
        builder
        .addCase(getTests.pending,(state)=>{    
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.errorMessage="";
        })
        .addCase(getTests.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getData=action.payload;
            state.errorMessage="";
        })
        .addCase(getTests.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.getData=null;
            state.errorMessage=action.payload || "Failed to fetch tests";
        })
    },
})

export default getTestSlice.reducer;