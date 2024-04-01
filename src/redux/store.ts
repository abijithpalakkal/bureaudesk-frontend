import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./slices/userreducer/userReducer";
import companyReducer from "./slices/companyreducer/companyReducer";

const reducer=combineReducers({
    userdetails:useReducer,
    companydetails:companyReducer
})
export const store =configureStore({
    reducer:reducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;