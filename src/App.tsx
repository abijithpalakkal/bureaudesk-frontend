import Loginpage from "./pages/Loginpage"
import Signinpage from "./pages/Signinpage"
import Employee from "./pages/Department"
import Companypage from "./pages/Companypage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from "react"
import { userauth } from "./redux/actions/useractions/userActions"
import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "./redux/store"
import { getCompanyAction } from "./redux/actions/useractions/getCompanyAction"
import { useSelector } from "react-redux"
import { useNavigate, Navigate } from "react-router-dom"
import Listemployeepage from "./pages/Listemployeepage"
import Viewprofilepage from "./pages/Viewprofilepage"
import Viewteampage from "./pages/Viewteampage"
import Post from "./context/Conteststore"
import ErrorPage from "./pages/Errorpage404"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Eventspage from "./pages/Eventspage"
import Projectpage from "./pages/Projectpage"
import Assigntaskpage from "./pages/Assigntaskpage"
import Messagerpage from "./pages/Messagerpage"
import Dashboard from "./pages/Dashboard"
import { Toaster } from 'react-hot-toast';
import Layout from "./pages/Layout"
import AddProject from "./components/maincomponents/AddProject"


function App() {
  const dispatch = useDispatch<AppDispatch>()
  const userid = useSelector((state: RootState) => state.userdetails.user._id)
  const role = useSelector((state: RootState) => state.userdetails.user.Authorization)

  useEffect(() => {
    if (!userid) {
      const auth = async () => {
        const response: any = await dispatch(userauth())
        if (response.payload?.companyid) {

          await dispatch(getCompanyAction(response.payload.companyid))
        }
      }
      auth()
    }

  }, [userid])

  /*return (
    <Router>
      
        <Routes>

          <Route path="/signup" element={!userid ? <Signinpage /> : <Navigate to={'/company'} />} />
          <Route path="/" element={!userid ? <Loginpage /> : <Navigate to={'/company'} />} />
          <Route path="/employees" element={userid ? <Employee /> : <Navigate to={'/'} />} />
          <Route path="/company" element={userid ? <Companypage /> : <Navigate to={'/'} />} />
          <Route path="/listemployees/:id" element={userid ? <Listemployeepage /> : <Navigate to={'/'} />} />
          <Route path="/viewprofile" element={userid ? <Viewprofilepage /> : <Navigate to={'/'} />} />
          <Route path="/viewteam/:id" element={userid ? <Viewteampage /> : <Navigate to={'/'} />} />

        </Routes>
      
    </Router>
  )*/

  if (role === null || role === undefined) {

    return (
      <Router>
        <ToastContainer />
        <Toaster />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signup" element={<Signinpage />} />
          <Route path="/" element={<Loginpage />} />
        </Routes>
      </Router>
    )
  }

  if (role === "root_node" || role === "semi_node") {
    return (
      <Router>
        <ToastContainer />
        <Toaster />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signup" element={!userid ? <Signinpage /> : <Navigate to={'/company'} />} />
          <Route path="/" element={!userid ? <Loginpage /> : <Navigate to={'/company'} />} />
          <Route path="/" element={userid ? <Layout/> : <Navigate to={'/'} />} >
            <Route path="/events" element={userid ? <Eventspage /> : <Navigate to={'/'} />} />
            <Route path="/projects" element={userid ? <Projectpage /> : <Navigate to={'/'} />} />
            <Route path="/projects/addproject" element={userid ? <AddProject /> : <Navigate to={'/'} />} />
          </Route>
          <Route path="/employees" element={userid ? <Employee /> : <Navigate to={'/'} />} />
          <Route path="/company" element={userid ? <Companypage /> : <Navigate to={'/'} />} />
          <Route path="/listemployees/:id" element={userid ? <Listemployeepage /> : <Navigate to={'/'} />} />
          <Route path="/viewprofile" element={userid ? <Viewprofilepage /> : <Navigate to={'/'} />} />
          <Route path="/viewteam/:id" element={userid ? <Viewteampage /> : <Navigate to={'/'} />} />
          <Route path="/404error" element={userid ? <ErrorPage /> : <Navigate to={'/'} />} />
          <Route path="/assigntask" element={userid ? <Assigntaskpage /> : <Navigate to={'/'} />} />
          <Route path="/messenger" element={userid ? <Messagerpage /> : <Navigate to={'/'} />} />
          <Route path="/dashboard" element={userid ? <Dashboard /> : <Navigate to={'/'} />} />
        </Routes>
      </Router>
    )
  }


  if (role === "basic_node") {
    return (
      <Router>
        <ToastContainer />
        <Toaster />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signup" element={!userid ? <Signinpage /> : <Navigate to={'/company'} />} />
          <Route path="/" element={!userid ? <Loginpage /> : <Navigate to={'/company'} />} />
          <Route path="/employees" element={userid ? <Employee /> : <Navigate to={'/'} />} />
          <Route path="/company" element={userid ? <Companypage /> : <Navigate to={'/'} />} />
          <Route path="/listemployees/:id" element={userid ? <Listemployeepage /> : <Navigate to={'/'} />} />
          <Route path="/viewprofile" element={userid ? <Viewprofilepage /> : <Navigate to={'/'} />} />
          <Route path="/" element={userid ? <Layout/> : <Navigate to={'/'} />} >
            <Route path="/events" element={userid ? <Eventspage /> : <Navigate to={'/'} />} />
            <Route path="/projects" element={userid ? <Projectpage /> : <Navigate to={'/'} />} />
          </Route>
          <Route path="/assigntask" element={userid ? <Assigntaskpage /> : <Navigate to={'/'} />} />
          <Route path="/messenger" element={userid ? <Messagerpage /> : <Navigate to={'/'} />} />
          <Route path="/dashboard" element={userid ? <Dashboard /> : <Navigate to={'/'} />} />
        </Routes>
      </Router>


    )
  }

}


export default App
