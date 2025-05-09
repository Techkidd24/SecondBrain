import { Dashboard } from "./pages/Dashboard"
import { LandingPage } from "./pages/LandingPage"
import { ShareBrainPage } from "./pages/ShareBrainPage"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareLink" element={<ShareBrainPage />} />
      </Routes>
    </BrowserRouter>

  )
}


export default App
