import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    users:{
        name:"",
        email:"",
        uid:""
    }
};

export const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        addUser:(state, action)=>{
            console.log(action.payload)
            state.users=action.payload
            
        }
    }
})
export const {addUser} = authSlice.actions;
export default authSlice.reducer;