/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";

// IMPORTAMOS LOS HOOKS
import useCalendar from "../hooks/useCalendar";

// IMPORTAMOS LOS ESTILOS
import "../styles/DateInformation.css";

export default function DateInformation({
  dataDate,
  setShowEditDate,
  setCurrentDataDate,
  setShowModalChangeStatusDate,
  setTextModalChangeStatusDate,
  setIdDateUpdate,
}) {
  const { user } = useGlobal();
  const { formatDate } = useCalendar();
  const {
    idCita,
    FechaCita,
    HoraCita,
    NombreCliente,
    TelefonoCliente,
    ImagenCita,
    MotivoCita,
    SubmotivoCita,
    EmpleadoAsignado,
    EstadoCita,
  } = dataDate;

  const setDataDateOnInputs = () => {
    setCurrentDataDate({
      idCita,
      FechaCita: FechaCita.substring(0, 10),
      HoraCita,
      NombreCliente,
      TelefonoCliente,
      ImagenCita,
      MotivoCita,
      SubmotivoCita,
      EmpleadoAsignado,
    });
    // getHoursForTheServiceSelected();
    setShowEditDate(true);
  };

  // const getHoursForTheServiceSelected = () => {};

  const handleStatusDate = (status) => {
    setShowModalChangeStatusDate(true);
    setTextModalChangeStatusDate(status);
    setIdDateUpdate(dataDate);
  };

  // const handleAsist = () => {
  //   setShowModalChangeStatusDate(true);
  //   setTextModalChangeStatusDate("No Asistio");
  //   setIdDateUpdate(idCita);
  // };
  // const handleCompleted = () => {
  //   setShowModalChangeStatusDate(true);
  //   setTextModalChangeStatusDate("Completada");
  //   setIdDateUpdate(idCita);
  // };

  return (
    <section className="DatingHistory__Container--Dates--Card" id={idCita}>
      <div className="DatingHistory__Container--Dates--Card--Container">
        <picture className="DatingHistory__Container--Dates--Card--Container--Img">
          <img
            src={`${HOST_IMG}/${ImagenCita}`}
            alt={`Icono De ${MotivoCita}`}
          />
        </picture>
        <span className="DatingHistory__Container--Dates--Card--Container--Details">
          <p className="DatingHistory__Container--Dates--Card--Container--Details--Text">
            📄 {idCita}
          </p>
          <p className="DatingHistory__Container--Dates--Card--Container--Details--Text">
            👤 {NombreCliente}
          </p>
          <p className="DatingHistory__Container--Dates--Card--Container--Details--Text">
            📆 {formatDate(FechaCita.substring(0, 10))}
          </p>
          <p className="DatingHistory__Container--Dates--Card--Container--Details--Text">
            ⌚ {HoraCita}
          </p>
        </span>
        {EstadoCita === "Confirmada" ||
        (EstadoCita === "Sin confirmar" &&
          user.rolUsuario === "Administrador") ? (
          <span className="DatingHistory__Container--Dates--Card--Container--Button">
            <button
              className="DatingHistory__Container--Dates--Card--Container--Button--View"
              onClick={setDataDateOnInputs}
            >
              <ion-icon name="brush-outline"></ion-icon>
            </button>
          </span>
        ) : null}
        {/* {EstadoCita === "Confirmada" && user.rolUsuario === "Administrador" && (
          <span className="DatingHistory__Container--Dates--Card--Container--Button">
            <button
              className="DatingHistory__Container--Dates--Card--Container--Button--View"
              onClick={setDataDateOnInputs}
            >
              <ion-icon name="brush-outline"></ion-icon>
            </button>
          </span>
        )} */}
      </div>
      {EstadoCita === "Sin confirmar" &&
        user.rolUsuario === "Administrador" && (
          <div className="DatingHistory__Container--Dates--Card--Buttons">
            <button
              className="DatingHistory__Container--Dates--Card--Buttons--Negative"
              onClick={() => handleStatusDate("Eliminar")}
            >
              Eliminar
            </button>
            <button
              className="DatingHistory__Container--Dates--Card--Buttons--Positive"
              onClick={() => handleStatusDate("Confirmada")}
            >
              Confirmar
            </button>
          </div>
        )}
      {EstadoCita === "Confirmada" && (
        <div className="DatingHistory__Container--Dates--Card--Buttons">
          <button
            className="DatingHistory__Container--Dates--Card--Buttons--Negative"
            onClick={() => handleStatusDate("No Asistio")}
          >
            No asistió
          </button>
          <button
            className="DatingHistory__Container--Dates--Card--Buttons--Positive"
            onClick={() => handleStatusDate("Completada")}
          >
            Completar
          </button>
        </div>
      )}
      {EstadoCita === "Completada" || EstadoCita === "No Asistio" ? (
        <p className="DateInformation__Container--Status">
          Esta cita se marco como {`"${EstadoCita.toUpperCase()}"`}
        </p>
      ) : null}
    </section>
  );
}
