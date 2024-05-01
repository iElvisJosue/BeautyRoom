// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { DatesProvider } from "./context/DatesContext";
import { ServicesProvider } from "./context/ServicesContext";

// IMPORTAMOS LAS VISTAS
import Login from "./views/Login";
import Date from "./views/Date";
import DatingHistory from "./views/DatingHistory";
import DateCreated from "./views/DateCreated";
import AddUsers from "./views/AddUsers";
import SalesInventory from "./views/SalesInventory";

// PROTECCIÓN DE RUTAS
import ProtectedByCookies from "./protection/ProtectedByCookies";
// import ProtectedForAdmins from "./protection/ProtectedForAdmins";

export default function App() {
  return (
    <GlobalProvider>
      <DatesProvider>
        <ServicesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/AgendarCita" element={<Date />} />
              <Route element={<ProtectedByCookies />}>
                {/* <Route element={<ProtectedForAdmins />}> */}
                <Route path="/HistorialDeCitas" element={<DatingHistory />} />
                <Route path="/AgendarCitaAdministrador" element={<Date />} />
                <Route path="/AdministrarUsuarios" element={<AddUsers />} />
                <Route path="/InventarioDeVenta" element={<SalesInventory />} />
                {/* </Route> */}
              </Route>
              <Route path="/CitaCreada" element={<DateCreated />} />
            </Routes>
          </BrowserRouter>
        </ServicesProvider>
      </DatesProvider>
    </GlobalProvider>
  );
}
