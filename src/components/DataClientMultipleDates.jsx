/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
export default function DataClientMultipleDates({
  setCartDates,
  cartDates,
  setProgressDate,
  getCartDatesAgain,
  setGetCartDatesAgain,
}) {
  const handleDeleteDateFromCart = (index) => {
    if (index > -1 && index < cartDates.length) {
      cartDates.splice(index, 1);
    }
    localStorage.setItem("cartDates", JSON.stringify(cartDates));
    setCartDates(cartDates);
    setGetCartDatesAgain(!getCartDatesAgain);
    //   const newCartDates = [...cartDates];
    //   newCartDates.splice(index, 1);
    //   localStorage.setItem("cartDates", JSON.stringify(newCartDates));
    //   setCartDates(newCartDates);
  };
  return (
    <>
      <p className="DataClient__Container__DateInformation__Title">
        Datos de las citas <br /> programadas
      </p>
      {cartDates.map(
        (
          {
            DíaCitaNombre,
            DíaCita,
            NombreMesCita,
            AñoCita,
            HoraCita,
            NombreServicio,
            ImagenServicio,
            NombreSubservicio,
          },
          index
        ) => (
          <span
            className="DataClient__Container__DateInformation__Title--Dates"
            key={index}
          >
            <button
              className="DataClient__Container__DateInformation__Title--Dates--Delete"
              onClick={() => handleDeleteDateFromCart(index)}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <p>CITA #{index + 1} </p>
            <img
              src={`${HOST_IMG}/${ImagenServicio}`}
              alt="Icono del servicio seleccionado"
            />
            <p>
              {NombreServicio} - {NombreSubservicio}
            </p>
            <img src="IconoCalendario.png" alt="Icono del calendario" />
            <p>
              {`${DíaCitaNombre} ${DíaCita}`}
              <br />
              {`de ${NombreMesCita} del ${AñoCita}`}
            </p>
            <img src="IconoReloj.png" alt="Icono del horario" />
            <p>{HoraCita}</p>
          </span>
        )
      )}

      {/* <div className="DataClient__Container__DateInformation__Service">
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
      </div> */}
      <button
        className="DataClient__Container__DateInformation__Buttons--Button"
        onClick={() => setProgressDate(0)}
      >
        Agregar otra cita
      </button>
    </>
  );
}
