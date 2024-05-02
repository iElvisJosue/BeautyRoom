/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/SubMenu.css";

export default function SubMenu({
  NombreOpciónUno = "Opción Uno",
  NombreOpciónDos = "Opción Dos",
  setOptionSubMenu,
  setRenderSubmenu,
  renderSubmenu,
}) {
  const setOptionOneSubmenu = () => {
    setOptionSubMenu(0);
    setRenderSubmenu(true);
  };
  const setOptionTwoSubmenu = () => {
    setRenderSubmenu(false);
    setOptionSubMenu(1);
  };

  return (
    <div className="SubMenu">
      <span className="SubMenu__Container">
        <button
          className={`SubMenu__Container--Button ${renderSubmenu && "Active"}`}
          onClick={setOptionOneSubmenu}
        >
          <ion-icon name="apps-outline"></ion-icon> {NombreOpciónUno}
        </button>
        <button
          className={`SubMenu__Container--Button ${!renderSubmenu && "Active"}`}
          onClick={setOptionTwoSubmenu}
        >
          <ion-icon name="add-circle-outline"></ion-icon> {NombreOpciónDos}
        </button>
      </span>
    </div>
  );
}
