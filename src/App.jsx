import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelect from "./pages/RoleSelect";

import CitizenDashboard from "./pages/CitizenDashboard";
import PoliticianDashboard from "./pages/PoliticianDashboard";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CookieConsent from "./components/CookieConsent";

function App() {
  return (
    <BrowserRouter>
      <CookieConsent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/roles" element={<RoleSelect />} />

        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/politician" element={<PoliticianDashboard />} />
        <Route path="/moderator" element={<ModeratorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;