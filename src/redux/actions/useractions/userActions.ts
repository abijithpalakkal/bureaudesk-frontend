import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IProps{
    otp:string;
    password:string;
    email:string;
}

export const userSignupAction = createAsyncThunk(
    "user/userlogin",
    async (usercredential: IProps, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/otpsignup', {
                ...usercredential
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data?.status && response.data?.payload === "verified") {
                console.log(response.data.data, "ajbdkajbhkcbajjavhavhcahdbvjksvhkabvhbjkhbvshb");
                return response.data.data;
            } else if (response.data?.status && response.data?.payload === "not verified") {
                throw new Error("Wrong OTP");
            } else {
                throw new Error("Error while signing up");
            }
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);