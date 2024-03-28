import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./slices/userreducer/userReducer";


export const store =configureStore({
    reducer:{
        userdetails:useReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;