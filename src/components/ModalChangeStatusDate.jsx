/* eslint-disable react/prop-types */

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalChangeStatusDate.css";

export default function ModalChangeStatusDate({
  showModalChangeStatusDate,
  setShowModalChangeStatusDate,
  textModalChangeStatusDate,
  idDateUpdate,
  // setFilter,
  // filter,
  // getDatesWaiting,
  getDatesByFilter,
  getMyDatesByFilter,
  setGetDatesByFilterAgain,
  getDatesByFilterAgain,
}) {
  const { updateStatusDate, deleteDate } = useDates();

  const classModalChangeStatusDate = showModalChangeStatusDate
    ? "ModalChangeStatusDate Show"
    : "ModalChangeStatusDate";

  const handleUpdateStatusDate = async () => {
    // ASIGNAMOS EL NUEVO ESTADO DE LA CITA
    idDateUpdate.EstadoCita = textModalChangeStatusDate;
    textModalChangeStatusDate === "Eliminar"
      ? DeleteDate()
      : OnlyUpdateStatusDate();
  };

  const OnlyUpdateStatusDate = async () => {
    // const dataStatus = {
    //   EstadoCita: textModalChangeStatusDate,
    //   idCita: idDateUpdate[0].idCita,
    // };
    try {
      const res = await updateStatusDate(idDateUpdate);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setShowModalChangeStatusDate(false);
      // setFilter(!filter);
      if (getDatesByFilter) {
        getDatesByFilter(textModalChangeStatusDate);
      }
      // ESTA FUNCIÓN SOLO SIRVE PARA LOS EMPLEADOS
      if (getMyDatesByFilter) {
        getMyDatesByFilter(textModalChangeStatusDate);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const DeleteDate = async () => {
    try {
      const res = await deleteDate(idDateUpdate.idCita);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setShowModalChangeStatusDate(false);
      setGetDatesByFilterAgain(!getDatesByFilterAgain);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <main className={classModalChangeStatusDate}>
      <div className="ModalChangeStatusDate__Container">
        <button
          className="ModalChangeStatusDate__Container__Close"
          onClick={() => setShowModalChangeStatusDate(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalChangeStatusDate__Container__Title">Advertencia</p>
        <hr className="ModalChangeStatusDate__Container__Divisor" />
        <p className="ModalChangeStatusDate__Container__Text">
          ¿Estas seguro de que deseas cambiar el estado de la cita a{" "}
          <b>{textModalChangeStatusDate.toUpperCase()}</b>? Esta operación no
          podrá ser revertida una vez realizada.
        </p>
        <button
          className="ModalChangeStatusDate__Container__Form--Button"
          onClick={handleUpdateStatusDate}
        >
          Marcar como {textModalChangeStatusDate.toUpperCase()}
        </button>
      </div>
    </main>
  );
}
