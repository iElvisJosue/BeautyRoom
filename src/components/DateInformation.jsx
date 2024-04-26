/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { imgListOfServices2 } from "../helpers/ListServices";

// IMPORTAMOS LOS HOOKS
import useCalendar from "../hooks/useCalendar";

// IMPORTAMOS LOS ESTILOS
import "../styles/DateInformation.css";
export default function DateInformation({
  idCita,
  FechaCita,
  HoraCita,
  NombreCliente,
  TelefonoCliente,
  ImagenCita,
  MotivoCita,
  EmpleadoAsignado,
  setShowEditDate,
  setCurrentDataDate,
}) {
  const { formatDate } = useCalendar();

  const setDataDateOnInputs = () => {
    setCurrentDataDate({
      idCita,
      FechaCita: FechaCita.substring(0, 10),
      HoraCita,
      NombreCliente,
      TelefonoCliente,
      ImagenCita,
      MotivoCita,
      EmpleadoAsignado,
    });
    setShowEditDate(true);
  };

  return (
    <section
      className="DatingHistory__Container--Dates--Card"
      id={idCita}
      onClick={setDataDateOnInputs}
    >
      <picture className="DatingHistory__Container--Dates--Card--Img">
        <img
          src={imgListOfServices2[ImagenCita]}
          alt="Icono De Corte De Pelo"
        />
      </picture>
      <span className="DatingHistory__Container--Dates--Card--Details">
        <p className="DatingHistory__Container--Dates--Card--Details--Text">
          👤 {NombreCliente}
        </p>
        <p className="DatingHistory__Container--Dates--Card--Details--Text">
          📆 {formatDate(FechaCita.substring(0, 10))}
        </p>
        <p className="DatingHistory__Container--Dates--Card--Details--Text">
          ⌚ {HoraCita}
        </p>
      </span>
      <span className="DatingHistory__Container--Dates--Card--Button">
        <button className="DatingHistory__Container--Dates--Card--Button--View">
          <ion-icon name="brush-outline"></ion-icon>
        </button>
      </span>
    </section>
  );
}
