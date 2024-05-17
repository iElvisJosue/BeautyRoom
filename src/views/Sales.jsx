// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import SalesDaily from "../components/SalesDaily";
import SalesAll from "../components/SalesAll";

// IMPORTAMOS LOS HOOKS A USAR
import useSubMenu from "../hooks/useSubMenu";

// IMPORTAMOS LOS ESTILOS
import "../styles/Sales.css";

export default function Sales() {
  const { optionSubMenu, setOptionSubMenu } = useSubMenu();

  return (
    <main className="Sales">
      <Navbar>Reporte de Ventas</Navbar>
      <div className="Sales__Container">
        <SubMenu
          NombreOpciónUno="Reporte diario"
          NombreOpciónDos="Todas las ventas"
          firstIcon="calendar-number-outline"
          secondIcon="apps-outline"
          setOptionSubMenu={setOptionSubMenu}
          optionSubMenu={optionSubMenu}
        />
        {optionSubMenu === 0 ? <SalesDaily /> : <SalesAll />}
      </div>
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
