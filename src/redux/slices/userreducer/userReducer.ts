import { createSlice } from '@reduxjs/toolkit';
import { userSignupAction } from '../../actions/useractions/userActions';
import { toast } from 'react-toastify';

const initialState= {
    loading: false,
    user: {},
    message: "",
    error: null,
  };


const useReducer=createSlice({
    name:'userReducer',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(userSignupAction.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(userSignupAction.fulfilled, (state, action) => {
        console.log(action.payload,"hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        toast.success(action.payload as any);
        state.loading = false;
        state.user = action.payload;
        state.message = "loaded"
        console.log(state.user)
      })
    }
})
export default useReducer.reducer;