import { createSlice } from '@reduxjs/toolkit';
import { userSignupAction } from '../../actions/useractions/userActions';
import { userLoginAction } from '../../actions/useractions/userActions';



interface iError {
    message:string
}

const initialState= {
    loading: false,
    user: {},
    message: "",
    error: "",
  };



const useReducer=createSlice({
    name:'userReducer',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(userSignupAction.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(userSignupAction.fulfilled, (state, action) => {
        console.log(action.payload,"hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        state.loading = false;
        state.user = action.payload;
        state.message = "loaded"
        console.log(state.user)
      })
      .addCase(userSignupAction.rejected, (state, action) => {
        console.log(action.payload,"yombe")
        if((action.payload as iError ).message == 'Wrong OTP'){
            alert("Wrong otp")
        }
        if((action.payload as iError).message=="Error while signing up"){
            alert("Error while signing up")
        }
        console.log(action.error,"yombe")
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
        console.log(action.payload,"hererererereer")
        state.loading = false;
        state.user = action.payload as any;
        state.message = "loaded"
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.error = action.error as string;
        state.message = "rejected";
        state.loading = false;
      })
    }
})
export default useReducer.reducer;