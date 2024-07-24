import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleErrors } from "../../../utils/handleErrors";
import fetchData from "../../../utils/fetchdata";
import {baseUrl} from "../../../config/constant"

interface IProps {
    otp?: string;
    password: string;
    email: string;
}

export const userSignupAction = createAsyncThunk(
    "user/usersignup",
    async (usercredential: IProps, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/otpsignup`, {
                ...usercredential
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data?.status && response.data?.payload === "verified") {
              
                return response.data.data;
            } else if (response.data?.status && response.data?.payload === "not verified") {
                throw new Error("Wrong OTP");
            } else {
                throw new Error("Error while signing up");
            }
        } catch (error: any) {
            return rejectWithValue(handleErrors(error));
        }
    }
);

export const userLoginAction = createAsyncThunk(
    "user/userlogin",
    async (usercredential: IProps, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/login`, usercredential, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
           console.log(response.data,"response.data")
            if (response.data.errorResponse) {
                throw new Error(response.data.errorResponse.message)
            } else {
                const response1 = await axios.post(`${baseUrl}/user/getuserdetailsforlogin`, { id: response.data._id }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
               
                return response1.data
            }


        } catch (error) {
            return rejectWithValue(handleErrors(error))
        }
    }
)


export const userauth = createAsyncThunk(
    "user/userauth",
    async (_, { rejectWithValue }) => {
        try {
           const response=await fetchData("/user/getuserforauth")
       
          return response.data
        } catch(error) {
            return rejectWithValue(handleErrors(error))
        }
    }
)