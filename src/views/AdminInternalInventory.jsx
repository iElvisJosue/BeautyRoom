/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminInternalInventory.css";

export default function AdminInternalInventory() {
  return (
    <main className="AdminInternalInventory">
      <Navbar>Inventario Interno</Navbar>
      <SubMenu
        NombreOpciónUno="Inventario General"
        NombreOpciónDos="Agregar Insumo"
      />
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
