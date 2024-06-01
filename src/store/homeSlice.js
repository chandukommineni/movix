import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:{},
    genres:{}
}

const homeSlice=createSlice({
    name:"counter",
    initialState,
    reducers:{

       getApiConfiguration:(state,action)=>{
        state.url=action.payload

       },
       getGeneres:(state,action)=>{
      state.genres=action.payload
       }

    }
})

export const {getApiConfiguration,getGeneres}=homeSlice.actions

export default homeSlice.reducer
