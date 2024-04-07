import { createSlice } from '@reduxjs/toolkit';
import { getCompanyAction } from '../../actions/useractions/getCompanyAction';


interface icompany {
  _id?:string,
  Name?:string,
  Bussinesstype?:string,
  Description?:string ,
  Companylogo?:string,
}

const initialState = {
  loading: false,
  company: {} as icompany,
  message: "",
  error: "",
};

const useReducer = createSlice({
  name: 'companyReducer',
  initialState,
  reducers: {
    usercompanylogout:(state)=>{
      state.company={}
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyAction.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(getCompanyAction.fulfilled, (state, action) => {
        console.log(action.payload, "❤️🚀😊😒🤣👌")
        state.loading = false;
        state.company = action.payload as any;
        state.message = "loaded"
      })
      .addCase(getCompanyAction.rejected, (state, action) => {
        state.error = action.error as string;
        state.message = "rejected";
        state.loading = false;
      })
  }
})
export default useReducer.reducer;
export const {usercompanylogout} = useReducer.actions