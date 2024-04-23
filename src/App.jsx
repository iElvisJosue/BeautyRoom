// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { DatesProvider } from "./context/DatesContext";

// IMPORTAMOS LAS VISTAS
import Login from "./views/Login";
import Date from "./views/Date";
import DatingHistory from "./views/DatingHistory";

// PROTECCIÓN DE RUTAS
import ProtectedByCookies from "./protection/ProtectedByCookies";

export default function App() {
  return (
    <GlobalProvider>
      <DatesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/AgendarCita" element={<Date />} />
            <Route element={<ProtectedByCookies />}>
              <Route path="/HistorialDeCitas" element={<DatingHistory />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DatesProvider>
    </GlobalProvider>
  );
}
