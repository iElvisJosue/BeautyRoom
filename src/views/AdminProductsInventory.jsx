// LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminProductsInventory.css";

export default function AdminProductsInventory() {
  return (
    <main className="AdminProductsInventory">
      <Navbar>Inventario de Productos</Navbar>
      <SubMenu
        NombreOpciónUno="Inventario General"
        NombreOpciónDos="Agregar Producto"
      />
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
