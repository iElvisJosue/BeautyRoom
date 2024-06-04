/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";
// import { HOST_API_DATES } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalPay.css";
export default function ModalPay({ showModalPay, setShowModalPay, cartDates }) {
  const [showButtonPay, setShowButtonPay] = useState(true);
  const navigate = useNavigate();
  // const initialOptions = {
  //   "client-id":
  //     "ASloaHCfRahs6J3OBj883To-ud-TDC5D4PW5d-ZOCqMWsMeRu_C3jLQNF1gOaW89IsFb42BCF7V-jRsA",
  //   "enable-funding": "paylater,venmo",
  //   "data-sdk-integration-source": "integrationbuilder_sc",
  // };
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
      // const FechaCitaFormateada = `${DíaCita} de ${NombreMesCita} de ${AñoCita} a las ${HoraCita}`;
      // dateInformation.FechaCitaFormateada = FechaCitaFormateada;
      // const res = await createOrder(dateInformation);
      const res = await createOrder(cartDates);
      window.location.href = res.data.links[1].href;
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };
  // CREAMOS LA CITA DIRECTAMENTE
  const createDateByAdmin = async () => {
    // const FechaCitaFormateada = `${DíaCita} de ${NombreMesCita} de ${AñoCita} a las ${HoraCita}`;
    // dataInfo.FechaCitaFormateada = FechaCitaFormateada;
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
        {/* <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              shape: "rect",
              layout: "vertical",
            }}
            createOrder={async () => {
              try {
                const response = await fetch(`${HOST_API_DATES}/createOrder`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cartDates,
                  }),
                });

                const orderData = await response.json();

                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error(error);
              }
            }}
            onApprove={async (data, actions) => {
              try {
                const response = await fetch(
                  `${HOST_API_DATES}/${data.orderID}/captureOrderPayPal`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                const orderData = await response.json();
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you message

                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  toast.error(
                    `Error: ${errorDetail.description} (${orderData.debug_id})`
                  );
                  // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                  return actions.restart();
                } else if (errorDetail) {
                  // (2) Other non-recoverable errors -> Show a failure message
                  toast.error(
                    `Error: ${errorDetail.description} (${orderData.debug_id})`
                  );
                  // throw new Error(
                  //   `${errorDetail.description} (${orderData.debug_id})`,
                  // );
                } else {
                  // (3) Successful transaction -> Show confirmation or thank you message
                  // Or go to another URL:  actions.redirect('thank_you.html');
                  toast.success(
                    `¡Gracias por tu compra! Tu cita ha sido confirmada.`
                  );
                  console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                  );
                }
              } catch (error) {
                console.error(error);
              }
            }}
          />
        </PayPalScriptProvider> */}
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
            Realizar Pago
          </button>
        )}
      </div>
    </main>
  );
}
