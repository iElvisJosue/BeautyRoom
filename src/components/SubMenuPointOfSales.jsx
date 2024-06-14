/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/SubMenuPointOfSales.css";

export default function SubMenuPointOfSales({
  NombreOpciónUno = "Opción Uno",
  NombreOpciónDos = "Opción Dos",
  // NombreOpciónTres = "Opción Tres",
  optionSubMenuPointOfSales,
  setOptionSubMenuPointOfSales,
}) {
  const setOptionOneSubmenu = () => {
    setOptionSubMenuPointOfSales(0);
  };
  const setOptionTwoSubmenu = () => {
    setOptionSubMenuPointOfSales(1);
  };
  // const setOptionThreeSubmenu = () => {
  //   setOptionSubMenuPointOfSales(2);
  // };

  return (
    <div className="SubMenuPointOfSales">
      <span className="SubMenuPointOfSales__Container">
        <button
          className={`SubMenuPointOfSales__Container--Button ${
            optionSubMenuPointOfSales === 0 && "Active"
          }`}
          onClick={setOptionOneSubmenu}
        >
          <ion-icon name="cut-outline"></ion-icon> {NombreOpciónUno}
        </button>
        <button
          className={`SubMenuPointOfSales__Container--Button ${
            optionSubMenuPointOfSales === 1 && "Active"
          }`}
          onClick={setOptionTwoSubmenu}
        >
          <ion-icon name="basket-outline"></ion-icon> {NombreOpciónDos}
        </button>
        {/* <button
          className={`SubMenuPointOfSales__Container--Button ${
            optionSubMenuPointOfSales === 2 && "Active"
          }`}
          onClick={setOptionThreeSubmenu}
        >
          <ion-icon name="cube-outline"></ion-icon> {NombreOpciónTres}
        </button> */}
      </span>
    </div>
  );
}
