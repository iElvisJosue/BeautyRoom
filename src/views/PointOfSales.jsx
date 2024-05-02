// LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
// import Menu from "../components/Menu";

// IMPORTAMOS LOS HOOKS
// import useMenu from "../hooks/useMenu";
// import usePassword from "../hooks/usePassword";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSales.css";

export default function PointOfSales() {
  // const { showMenu, setShowMenu } = useMenu();

  return (
    <main className="PointOfSales">
      <Navbar>Punto de Venta</Navbar>
      {/* <Menu showMenu={showMenu} setShowMenu={setShowMenu}></Menu> */}
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
