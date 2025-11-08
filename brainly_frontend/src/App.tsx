import { Dashboard } from "./pages/dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { SharedBrain } from "./pages/SharedBrain"
import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom"

 function App() {
  return <BrowserRouter>
   <Routes>
    <Route path="/" element={<Navigate to="/signup" replace />} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Signin/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/share/:shareLink" element={<SharedBrain/>} />
   </Routes>
  </BrowserRouter>
  
  
}

export default App
