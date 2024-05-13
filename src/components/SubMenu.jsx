/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/SubMenu.css";

export default function SubMenu({
  NombreOpciónUno = "Opción Uno",
  NombreOpciónDos = "Opción Dos",
  setOptionSubMenu,
  optionSubMenu,
  firstIcon = "apps-outline",
  secondIcon = "add-circle-outline",
}) {
  const setOptionOneSubmenu = () => {
    setOptionSubMenu(0);
  };
  const setOptionTwoSubmenu = () => {
    setOptionSubMenu(1);
  };

  return (
    <div className="SubMenu">
      <span className="SubMenu__Container">
        <button
          className={`SubMenu__Container--Button ${
            optionSubMenu === 0 && "Active"
          }`}
          onClick={setOptionOneSubmenu}
        >
          <ion-icon name={firstIcon}></ion-icon> {NombreOpciónUno}
        </button>
        <button
          className={`SubMenu__Container--Button ${
            optionSubMenu === 1 && "Active"
          }`}
          onClick={setOptionTwoSubmenu}
        >
          <ion-icon name={secondIcon}></ion-icon> {NombreOpciónDos}
        </button>
      </span>
    </div>
  );
}
