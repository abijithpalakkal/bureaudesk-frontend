import Loginpage from "./pages/Loginpage"
import Signinpage from "./pages/Signinpage"
import Employee from "./pages/Employee"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/"  element={<Loginpage/>} />
      <Route path="/signup"  element={<Signinpage/>} />
      <Route path="/employees"  element={<Employee/>} />
      </Routes>
    </Router>
    
  
  )
}
export default App
