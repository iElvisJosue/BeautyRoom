// LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

// IMPORTAMOS LOS HOOKS
import useMenu from "../hooks/useMenu";
// import usePassword from "../hooks/usePassword";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminInventory.css";

export default function SalesInventory() {
  const { showMenu, setShowMenu } = useMenu();
  const [renderSubmenu, setRenderSubmenu] = useState(true);

  return (
    <main className="AdminInventory">
      <Navbar setShowMenu={setShowMenu}>Administrar Inventario</Navbar>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu}></Menu>
      <div className="AdminInventory__Container">
        <span className="AdminInventory__Container__Submenu">
          <button
            className={`AdminInventory__Container__Submenu--Button ${
              renderSubmenu && "Active"
            }`}
            onClick={() => setRenderSubmenu(true)}
          >
            <ion-icon name="apps-outline"></ion-icon> Inventario general
          </button>
          <button
            className={`AdminInventory__Container__Submenu--Button ${
              !renderSubmenu && "Active"
            }`}
            onClick={() => setRenderSubmenu(false)}
          >
            <ion-icon name="add-circle-outline"></ion-icon> Agregar producto
          </button>
        </span>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
