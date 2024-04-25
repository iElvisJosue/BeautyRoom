/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/ModalPay.css";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function ModalPay({
  showModalPay,
  setShowModalPay,
  dataClient,
  dayName,
  day,
  monthDay,
  year,
}) {
  const { createOrder } = useDates();

  const classModalPay = `ModalPay ${showModalPay ? "Show" : ""}`;

  const createDateOrder = async () => {
    try {
      const res = await createOrder(dataClient);
      window.location.href = res.data.links[1].href;
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  if (dataClient === null) {
    return null;
  }
  return (
    <main className={classModalPay}>
      <div className="ModalPay__Container">
        <button
          className="ModalPay__Container__Close"
          onClick={() => setShowModalPay(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalPay__Container__Title">
          Verifica los datos de tu cita
        </p>
        <hr className="ModalPay__Container__Divisor" />
        <p className="ModalPay__Container__Text">
          <b>Nombre:</b> {dataClient.NombreCliente}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Teléfono:</b> {dataClient.TelefonoCliente}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Motivo de la cita:</b> {dataClient.MotivoCita}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Fecha de la cita:</b>{" "}
          {`${dayName} ${day} de ${monthDay} del ${year}`}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Hora de la cita:</b> {dataClient.HoraCita}
        </p>
        <hr className="ModalPay__Container__Divisor" />
        <small className="ModalPay__Container__Message">
          ¡Atención! Para completar tu cita serás redirigido a PayPal,
          reconocido por su seguridad y protección de datos. Tu transacción se
          completará de manera segura en esta plataforma confiable. ¡Gracias por
          tu confianza!
        </small>
        <button
          className="ModalPay__Container__Form--Button"
          onClick={createDateOrder}
        >
          Realizar Pago
        </button>
      </div>
    </main>
  );
}
