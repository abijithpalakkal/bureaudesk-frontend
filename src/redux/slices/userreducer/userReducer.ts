import { createSlice } from '@reduxjs/toolkit';
import { userSignupAction } from '../../actions/useractions/userActions';
import { userLoginAction } from '../../actions/useractions/userActions';
import { userauth } from '../../actions/useractions/userActions';
import { toast } from 'react-toastify';



interface iError {
    message:string
}

interface iUser {
  _id?:string,
  Description?: string;
  Name?: string;
  Dob?: Date;
  companyid?:string;
  Contactno?: string;
  Location?: string;
  position?: string;
  Createdby?: string;
  password?: string;
  email?: string;
  Authorization?: string;
  Department?: string;
  Departmentid?: string;
  Admin?: boolean;
}

const initialState= {
    loading: false,
    user: {} as iUser ,
    message: "",
    error: "",
  };



const useReducer=createSlice({
    name:'userReducer',
    initialState,
    reducers:{
      userdetailslogout:(state)=>{
        state.user={}
      }
    },
    extraReducers:(builder)=>{
       builder
       .addCase(userSignupAction.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(userSignupAction.fulfilled, (state, action) => {
       
        state.loading = false;
        state.user = action.payload;
        state.message = "loaded"
       
      })
      .addCase(userSignupAction.rejected, (state, action) => {
      
        if((action.payload as iError ).message == 'Wrong OTP'){
            toast.error("Wrong otp")
        }
        if((action.payload as iError).message=="Error while signing up"){
            toast.error("Error while signing up")
        }
       
        const mesg = (action.payload as { message: string }).message;
        state.error = action.error as string;
        state.message = "rejected";
        state.loading = false;
      })
       
      .addCase(userLoginAction.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
       
        state.loading = false;
        state.user = action.payload as any;
        state.message = "loaded"
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.error = action.error as string;
        state.message = "rejected";
        state.loading = false;
        toast.error((action.payload as {message:string}).message)
      })


      .addCase(userauth.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(userauth.fulfilled, (state, action) => {
     
        state.loading = false;
        state.user = action.payload as any;
        state.message = "loaded"
      })
      .addCase(userauth.rejected, (state, action) => {
        state.error = action.error as string;
        state.message = "rejected";
        state.loading = false;
      })
    }
})
export default useReducer.reducer;
export const {userdetailslogout} = useReducer.actions