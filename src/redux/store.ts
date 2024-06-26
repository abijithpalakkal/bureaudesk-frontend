import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./slices/userreducer/userReducer";
import companyReducer from "./slices/companyreducer/companyReducer";
import notificationReducer from "./slices/notificationreducer/notificationReducer";

const reducer=combineReducers({
    userdetails:useReducer,
    companydetails:companyReducer,
    notification:notificationReducer
})
export const store =configureStore({
    reducer:reducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;