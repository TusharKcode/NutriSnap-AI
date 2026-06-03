import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Diary from "./pages/Diary";
import UploadFood from "./pages/UploadFood";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/upload" element={<UploadFood />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;