import {createSlice} from "@reduxjs/toolkit";


const initialState={
   currentUser:null,
   error:null,
loading:false,
}; 



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false

        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;

        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false;
        },
        deleteUserStart:(state)=>{
            state.loading=true;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteUserSuccess : (state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error= null;
        },
        signOutFailure:(state,action)=>{
            state.error = action.payload;
            state.loading=false;
        }
        ,
        signOutSuccess :(state,action)=>{
            state.loading=false;
            state.error=false;
            state.currentUser=null;
        },
        signOutStart:(state)=>{
            state.loading = true;
        },
        
    }
})


export const {signInStart,signOutFailure,signOutSuccess,signOutStart,signInFailure,signInSuccess,updateUserSuccess,updateUserFailure,updateUserStart,deleteUserFailure,deleteUserStart,deleteUserSuccess}=userSlice.actions;

export default userSlice.reducer;