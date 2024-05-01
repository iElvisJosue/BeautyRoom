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
  dateInformation,
  // dataClient,
  // dayName,
  // day,
  // monthDay,
  // year,
}) {
  const {
    NombreCliente,
    TelefonoCliente,
    NombreServicio,
    NombreSubservicio,
    DíaCitaNombre,
    DíaCita,
    NombreMesCita,
    AñoCita,
    HoraCita,
    MetodoPago,
  } = dateInformation;
  const { createOrder } = useDates();

  const classModalPay = showModalPay ? "ModalPay Show" : "ModalPay";

  const createDateOrder = async () => {
    try {
      const FechaCitaFormateada = `${DíaCita} de ${NombreMesCita} de ${AñoCita} a las ${HoraCita}`;
      dateInformation.FechaCitaFormateada = FechaCitaFormateada;
      const res = await createOrder(dateInformation);
      window.location.href = res.data.links[1].href;
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };
  // const createDateOrder = async () => {
  //   try {
  //     const FechaCitaFormateada = `${day} de ${monthDay} de ${year} a las ${HoraCita}`;
  //     dataClient.FechaCitaFormateada = FechaCitaFormateada;
  //     const res = await createOrder(dataClient);
  //     window.location.href = res.data.links[1].href;
  //   } catch (error) {
  //     console.log(error);
  //     const { status, data } = error.response;
  //     handleResponseMessages({ status, data });
  //   }
  // };
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
          <b>Nombre:</b> {NombreCliente}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Teléfono:</b> {TelefonoCliente}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Motivo de la cita:</b> {NombreServicio} - {NombreSubservicio}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Fecha de la cita:</b>{" "}
          {`${DíaCitaNombre} ${DíaCita} de ${NombreMesCita} del ${AñoCita}`}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Hora de la cita:</b> {HoraCita}
        </p>
        <p className="ModalPay__Container__Text">
          <b>Método de pago:</b> {MetodoPago}
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
