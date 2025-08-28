// import {} from "react-redux"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   status : false,
   userData : null
}


export const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (State,Action) =>{
            State.status = true
            State.userData = Action.payload.userData
        },

        logout : (State) =>{
            State.status = false;
            State.userData = null
        }
    }
})

export const {login,logout} = AuthSlice.actions;
export default AuthSlice.reducer;