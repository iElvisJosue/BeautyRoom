/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

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
  setGetDatesByFilterAgain,
  getDatesByFilterAgain,
}) {
  const { user } = useGlobal();
  const { deleteDate } = useDates();
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
    HoraCreacion,
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
    setShowEditDate(true);
  };

  useEffect(() => {
    // ACTIVAR SOLO SI ELLOS ASI LO DESEAN
    // EstadoCita === "Sin confirmar" && verificarTiempoCita(idCita, HoraCreacion);
  }, []);

  const handleStatusDate = (status) => {
    setShowModalChangeStatusDate(true);
    setTextModalChangeStatusDate(status);
    setIdDateUpdate(dataDate);
  };

  const calcularDiferenciaEnMinutos = (HoraCreacion) => {
    const { currentDate, currentHour } = obtenerFechaYHoraActual();
    // Convertir el tiempo a objetos Date
    const horaActual = new Date(`${currentDate}T${currentHour}Z`);
    const horaCita = new Date(`${currentDate}T${HoraCreacion}Z`);

    const differenceInMillis = horaActual - horaCita;
    // Calcular la diferencia en milisegundos

    // Convertir milisegundos a minutos
    const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));

    return differenceInMinutes;
  };

  const obtenerFechaYHoraActual = () => {
    const now = new Date();

    const options = {
      timeZone: "America/Mexico_City", // Zona horaria de México (Guerrero)
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato de 24 horas
    };

    const date = now.toLocaleTimeString("es-MX", options);
    const dateDivided = date.split(", ");
    const currentDate = dateDivided[0].split("/").reverse().join("-");
    const currentHour = dateDivided[1];

    return {
      currentDate,
      currentHour,
    };
  };

  const verificarTiempoCita = async (idCita, HoraCreacion) => {
    if (calcularDiferenciaEnMinutos(HoraCreacion) > 15) {
      try {
        const res = await deleteDate(idCita);
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          toast.success(
            `La cita con número de FOLIO: ${idCita}, ha excedió el tiempo de tolerancia (15 minutos) para su confirmación, por lo tanto ha sido eliminada. ✅`
          );
          setGetDatesByFilterAgain(!getDatesByFilterAgain);
        }
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
  };

  const canEdit = () => {
    if (EstadoCita === "Sin confirmar" || EstadoCita === "Confirmada") {
      return (
        <span className="DatingHistory__Container--Dates--Card--Container--Button">
          <button
            className="DatingHistory__Container--Dates--Card--Container--Button--View"
            onClick={setDataDateOnInputs}
          >
            <ion-icon name="brush-outline"></ion-icon>
          </button>
        </span>
      );
    } else {
      return null;
    }
  };

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
          <p className="DatingHistory__Container--Dates--Card--Container--Details--Text ID">
            #{idCita}
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
          <p className="DatingHistory__Container--Dates--Card--Container--Details--Text">
            💼 {EmpleadoAsignado}
          </p>
        </span>
        {user?.rolUsuario === "Administrador" && canEdit()}
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
