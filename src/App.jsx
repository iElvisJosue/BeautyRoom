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
import MyDates from "./views/MyDates";
import Sales from "./views/Sales";

// PROTECCIÓN DE RUTAS
import ProtectedByCookies from "./protection/ProtectedByCookies";
import ProtectedForAdmins from "./protection/ProtectedForAdmins";
import ProtectedForEmployees from "./protection/ProtectedForEmployees";

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
                  {/* RUTAS PROTEGIDAS PARA USUARIOS LOGUEADOS */}
                  <Route element={<ProtectedByCookies />}>
                    <Route path="/Principal" element={<Home />} />
                    {/* RUTAS PROTEGIDAS PARA EMPLEADOS */}
                    <Route element={<ProtectedForEmployees />}>
                      <Route path="/MisCitas" element={<MyDates />} />
                    </Route>
                    {/* RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                    <Route element={<ProtectedForAdmins />}>
                      <Route
                        path="/AdministrarCitas"
                        element={<AdminDates />}
                      />
                      <Route path="/PuntoDeVenta" element={<PointOfSales />} />
                      <Route
                        path="/AgendarCitaAdministrador"
                        element={<Date />}
                      />
                      <Route
                        path="/AdministrarUsuarios"
                        element={<AdminUsers />}
                      />
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
                      <Route path="/ReporteVentas" element={<Sales />} />
                    </Route>
                  </Route>
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
