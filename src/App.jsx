// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORTAMOS LAS VISTAS
import Login from "./views/Login";
import Date from "./views/Date";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AgendarCita" element={<Date />} />
      </Routes>
    </BrowserRouter>
  );
}
