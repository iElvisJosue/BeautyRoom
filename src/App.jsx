// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { DatesProvider } from "./context/DatesContext";
import { ServicesProvider } from "./context/ServicesContext";
import { ProductsProvider } from "./context/ProductsContext";
import { InternalProvider } from "./context/InternalContext";

// IMPORTAMOS LAS VISTAS
import Login from "./views/Login";
import Home from "./views/Home";
import Date from "./views/Date";
import DateCreated from "./views/DateCreated";
import PointOfSales from "./views/PointOfSales";
import AdminDates from "./views/AdminDates";
import AdminUsers from "./views/AdminUsers";
import AdminProductsInventory from "./views/AdminProductsInventory";
import AdminServicesInventory from "./views/AdminServicesInventory";
import AdminInternalInventory from "./views/AdminInternalInventory";

// PROTECCIÓN DE RUTAS
// import ProtectedByCookies from "./protection/ProtectedByCookies";
// import ProtectedForAdmins from "./protection/ProtectedForAdmins";

export default function App() {
  return (
    <GlobalProvider>
      <DatesProvider>
        <ServicesProvider>
          <ProductsProvider>
            <InternalProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/AgendarCita" element={<Date />} />
                  {/* <Route element={<ProtectedByCookies />}> */}
                  {/* <Route element={<ProtectedForAdmins />}> */}
                  <Route path="/Principal" element={<Home />} />
                  <Route path="/AdministrarCitas" element={<AdminDates />} />
                  <Route path="/PuntoDeVenta" element={<PointOfSales />} />
                  <Route path="/AgendarCitaAdministrador" element={<Date />} />
                  <Route path="/AdministrarUsuarios" element={<AdminUsers />} />
                  <Route
                    path="/AdministrarInventarioProductos"
                    element={<AdminProductsInventory />}
                  />
                  <Route
                    path="/AdministrarInventarioServicios"
                    element={<AdminServicesInventory />}
                  />
                  <Route
                    path="/AdministrarInventarioInterno"
                    element={<AdminInternalInventory />}
                  />
                  {/* </Route> */}
                  {/* </Route> */}
                  <Route path="/CitaCreada" element={<DateCreated />} />
                </Routes>
              </BrowserRouter>
            </InternalProvider>
          </ProductsProvider>
        </ServicesProvider>
      </DatesProvider>
    </GlobalProvider>
  );
}
