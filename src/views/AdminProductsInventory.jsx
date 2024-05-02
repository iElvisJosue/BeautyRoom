// LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";

// IMPORTAMOS LOS HOOKS A USAR
import useSubMenu from "../hooks/useSubMenu";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminProductsInventory.css";

export default function AdminProductsInventory() {
  const { optionSubMenu, setOptionSubMenu } = useSubMenu();

  return (
    <main className="AdminProductsInventory">
      <Navbar>Inventario de Productos</Navbar>
      <SubMenu
        NombreOpciónUno="Inventario General"
        NombreOpciónDos="Agregar Producto"
        setOptionSubMenu={setOptionSubMenu}
        optionSubMenu={optionSubMenu}
      />
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
