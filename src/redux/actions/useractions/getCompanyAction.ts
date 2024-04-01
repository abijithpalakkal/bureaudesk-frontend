import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleErrors } from "../../../utils/handleErrors";

export const getCompanyAction = createAsyncThunk(
    "company/userlogin",
    async (usercredential: string, { rejectWithValue }) => {
        try {
            console.log("its going")
            const response = await axios.get(`http://localhost:8000/company/getcompany/${usercredential}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if(response.data){
                console.log(response.data,"🚀🚀🚀🚀🚀🚀🚀🚀🚀")
                return response.data
            }
           
        } catch (error:any) {
            console.log("erroroor")
            return rejectWithValue(handleErrors(error));
        }
    }
);