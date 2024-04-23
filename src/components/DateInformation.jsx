/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/DateInformation.css";

// IMPORTAMOS LAS AYUDAS
import { imgListOfServices2 } from "../helpers/ListServices";

// IMPORTAMOS LOS HOOKS
import useCalendar from "../hooks/useCalendar";

export default function DateInformation({
  FechaCita,
  HoraCita,
  NombreCliente,
  ImagenCita,
}) {
  const { formatDate } = useCalendar();

  return (
    <section className="DatingHistory__Container--Dates--Card">
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
          <ion-icon name="eye-outline"></ion-icon>
        </button>
      </span>
    </section>
  );
}
