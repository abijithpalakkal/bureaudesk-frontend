import Loginpage from "./pages/Loginpage"
import Signinpage from "./pages/Signinpage"
import Employee from "./pages/Department"
import Companypage from "./pages/Companypage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from "react"
import fetchData from "./utils/fetchdata"
import { userauth } from "./redux/actions/useractions/userActions"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./redux/store"
import { getCompanyAction } from "./redux/actions/useractions/getCompanyAction"

function App() {
      const dispatch=useDispatch<AppDispatch>()
  useEffect(()=>{
    const auth=async()=>{
      const response:any=await dispatch(userauth())
      if(response.payload?.companyid){
        console.log("i am herere")
        await dispatch(getCompanyAction(response.payload.companyid))
       }
    }
   auth()
  },[])
  return (
    <Router>
      <Routes>
      <Route path="/"  element={<Loginpage/>} />
      <Route path="/signup"  element={<Signinpage/>} />
      <Route path="/employees"  element={<Employee/>} />
      <Route path="/company"  element={<Companypage/>} />
      </Routes>
    </Router>
    
  
  )
}
export default App
