/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalPay.css";
export default function ModalPay({ showModalPay, setShowModalPay, cartDates }) {
  const [totalToPay, setTotalToPay] = useState(0);
  const [showButtonPay, setShowButtonPay] = useState(true);
  const navigate = useNavigate();
  const [currentDataDate, setCurrentDataDate] = useState(0);
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
  } = cartDates[currentDataDate];
  const { createOrder, adminCreateNewDate } = useDates();

  const classModalPay = showModalPay ? "ModalPay Show" : "ModalPay";

  useEffect(() => {
    setTotalToPay(cartDates.length * cartDates[0].CostoCita);
  }, [showModalPay]);

  // MOSTRAMOS LA INFORMACIÓN DE LA SIGUIENTE CITA
  const nextDate = () => {
    if (currentDataDate < cartDates.length - 1) {
      setCurrentDataDate(currentDataDate + 1);
    }
  };
  // MOSTRAMOS LA INFORMACIÓN DE LA CITA ANTERIOR
  const previousDate = () => {
    if (currentDataDate > 0) {
      setCurrentDataDate(currentDataDate - 1);
    }
  };
  // CERRAMOS EL MODAL
  const closeModalPay = () => {
    setShowModalPay(false);
    setCurrentDataDate(0);
  };
  // VERIFICAMOS EL METODO DE PAGO
  const checkPayment = () => {
    setShowButtonPay(false);
    // SI EL METODO DE PAGO ES POR PAYPAL, CREAMOS LA ORDEN DE PAGO
    if (cartDates[0].MetodoPago === "PayPal") {
      createDateOrder();
    }
    // DE LO CONTRARIO LA CREAMOS DIRECTAMENTE
    else {
      createDateByAdmin();
    }
  };
  // CREAMOS LA ORDEN DE PAGO CON PAYPAL
  const createDateOrder = async () => {
    try {
      const res = await createOrder(cartDates);
      window.location.href = res.data.links[1].href;
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };
  // CREAMOS LA CITA DIRECTAMENTE
  const createDateByAdmin = async () => {
    try {
      // LO ENVIAMOS COMO UN ARRAY PARA VERIFICAR LA CANTIDAD DE CITAS
      const res = await adminCreateNewDate(cartDates);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      navigate("/CitaCreada");
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <main className={classModalPay}>
      <div className="ModalPay__Container">
        <button className="ModalPay__Container__Close" onClick={closeModalPay}>
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalPay__Container__Title">
          Verifica los datos de tu cita #{currentDataDate + 1}
        </p>
        <hr className="ModalPay__Container__Divisor" />
        <div className="ModalPay__Container__Details">
          {cartDates.length > 1 && (
            <>
              <button
                className="ModalPay__Container__Details__Button Previous"
                onClick={previousDate}
              >
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              <button
                className="ModalPay__Container__Details__Button Next"
                onClick={nextDate}
              >
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </button>
            </>
          )}
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
        </div>
        <hr className="ModalPay__Container__Divisor" />
        {cartDates[0].MetodoPago === "PayPal" ? (
          <small className="ModalPay__Container__Message">
            ¡Atención! Para completar tu cita serás redirigido a PayPal,
            reconocido por su seguridad y protección de datos. Tu transacción se
            completará de manera segura en esta plataforma confiable. ¡Gracias
            por tu confianza!
          </small>
        ) : (
          <small className="ModalPay__Container__Message">
            ¡Atención! Antes de continuar con el pago, asegúrate de que tus
            datos personales y la información de tus citas sean los correctos.
          </small>
        )}
        {showButtonPay && (
          <button
            className="ModalPay__Container__Form--Button"
            onClick={checkPayment}
          >
            Realizar Pago (
            {totalToPay.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
            )
          </button>
        )}
      </div>
    </main>
  );
}
