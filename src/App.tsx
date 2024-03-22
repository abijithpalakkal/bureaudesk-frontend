import Loginpage from "./pages/Loginpage"
import Signinpage from "./pages/Signinpage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/"  element={<Loginpage/>} />
      <Route path="/signup"  element={<Signinpage/>} />
      </Routes>
    </Router>
  )
}
export default App
