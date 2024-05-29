/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";

export default function DataClientOneDate({
  setCartDates,
  setProgressDate,
  cartDates,
}) {
  const {
    DíaCitaNombre,
    DíaCita,
    NombreMesCita,
    AñoCita,
    HoraCita,
    NombreServicio,
    ImagenServicio,
    NombreSubservicio,
  } = cartDates[0];
  // CON ESTA FUNCIÓN VAMOS A EDITAR LA CITA, Y A SU VEZ ELIMINAR EL CARRITO Y A REINICIAR EL CARRITO
  const handleEditDate = () => {
    localStorage.removeItem("cartDates");
    setCartDates([]);
    setProgressDate(0);
  };
  const handleAddOtherDate = () => {
    setProgressDate(0);
  };
  return (
    <>
      <p className="DataClient__Container__DateInformation__Title">
        Datos de la cita <br /> programada
      </p>
      <div className="DataClient__Container__DateInformation__Service">
        <picture className="DataClient__Container__DateInformation__Service--Img">
          <img
            src={`${HOST_IMG}/${ImagenServicio}`}
            alt="Icono del servicio seleccionado"
          />
        </picture>
        <p>
          {NombreServicio} - {NombreSubservicio}
        </p>
      </div>
      <div className="DataClient__Container__DateInformation__Details">
        <span className="DataClient__Container__DateInformation__Details--Day">
          <img src="IconoCalendario.png" alt="Icono del calendario" />
          <p>
            {`${DíaCitaNombre} ${DíaCita}`}
            <br />
            {`de ${NombreMesCita} del ${AñoCita}`}
          </p>
        </span>
        <span className="DataClient__Container__DateInformation__Details--Hour">
          <img src="IconoReloj.png" alt="Icono del horario" />
          <p>{HoraCita}</p>
        </span>
      </div>
      <span className="DataClient__Container__DateInformation__Buttons">
        <button
          className="DataClient__Container__DateInformation__Buttons--Button"
          onClick={handleEditDate}
        >
          Editar
        </button>
        <button
          className="DataClient__Container__DateInformation__Buttons--Button"
          onClick={handleAddOtherDate}
        >
          Agendar otra cita
        </button>
      </span>
    </>
  );
}
