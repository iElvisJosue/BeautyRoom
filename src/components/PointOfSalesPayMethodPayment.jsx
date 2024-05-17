/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { HOST_PDF } from "../helpers/Urls";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesPayMethodPayment.css";

export default function PointOfSalesPayMethodPayment({
  cart,
  setCart,
  setProgressPay,
  setUrlTicket,
}) {
  const [showInputMoney, setShowInputMoney] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [change, setChange] = useState(0);
  const [payment, setPayment] = useState(null);
  const { createTicket } = useGlobal();

  const getTotal = () => {
    let total = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    cart[0].OtrosServicios && (total += cart[0].OtrosServicios);
    cart[0].PropinaCliente && (total += cart[0].PropinaCliente);
    cart[0].idCita && (total -= 150);
    return total;
  };

  const classNameButtonMoney = showInputMoney
    ? "PointOfSalesPayMethodPayment__Cart__Header--Content--Button Active"
    : "PointOfSalesPayMethodPayment__Cart__Header--Content--Button";

  const handleUpdateCart = (methodPayment) => {
    cart.map((product) => {
      product.MetodoDePago = payment ?? methodPayment;
    });
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    handlePayCart(cart);
  };
  const handlePayCart = async (cart) => {
    try {
      const res = await createTicket(cart);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        setProgressPay(3);
        const pdfURL = `${HOST_PDF}/${res.data}`;
        setUrlTicket(pdfURL);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };
  const handleCheckMoney = (value) => {
    const regexOnlyNumbers = /^[0-9]+$/;
    const total = getTotal();
    if (regexOnlyNumbers.test(value)) {
      if (value >= total) {
        setChange(Number(value) - total);
        setShowConfirm(true);
      } else {
        setShowConfirm(false);
      }
    } else {
      setShowConfirm(false);
    }
  };
  const handleBackToMethodPayment = () => {
    setPayment("Efectivo");
    setShowInputMoney(!showInputMoney);
    setShowConfirm(false);
  };
  const backToCart = () => {
    setProgressPay(1);
  };
  const handleCreateTicket = (methodPayment) => {
    handleUpdateCart(methodPayment);
  };

  return (
    <section className="PointOfSalesPayMethodPayment__Cart">
      <header className="PointOfSalesPayMethodPayment__Cart__Header">
        <button
          className="PointOfSalesPayMethodPayment__Cart__Header--Button"
          onClick={backToCart}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
        <p className="PointOfSalesPayMethodPayment__Cart__Header--Title">
          Metodo de pago
        </p>
      </header>
      <div className="PointOfSalesPayMethodPayment__Cart__Header--Content">
        <button
          className={classNameButtonMoney}
          onClick={handleBackToMethodPayment}
        >
          <ion-icon name="cash-outline"></ion-icon>
          Efectivo
        </button>
        {!showInputMoney && (
          <>
            <button
              className="PointOfSalesPayMethodPayment__Cart__Header--Content--Button"
              onClick={() => handleCreateTicket("Tarjeta Crédito")}
            >
              <ion-icon name="card-outline"></ion-icon>
              Tarjeta Crédito
            </button>
            <button
              className="PointOfSalesPayMethodPayment__Cart__Header--Content--Button"
              onClick={() => handleCreateTicket("Tarjeta Débito")}
            >
              <ion-icon name="card-outline"></ion-icon>
              Tarjeta Débito
            </button>
            <button
              className="PointOfSalesPayMethodPayment__Cart__Header--Content--Button"
              onClick={() => handleCreateTicket("Transferencia")}
            >
              <ion-icon name="repeat-outline"></ion-icon>
              Transferencia
            </button>
          </>
        )}
        {showInputMoney && (
          <div className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input">
            <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input--Title">
              Ingresa el monto recibido
            </p>
            <input
              type="text"
              placeholder="0.00"
              className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input--Input"
              onChange={(e) => handleCheckMoney(e.target.value)}
            />
            <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input--Title">
              Total a pagar ${getTotal().toFixed(2)}
            </p>
            {showConfirm && (
              <>
                <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input--Title">
                  Cambio a dar ${change.toFixed(2)}
                </p>
                <button
                  className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input--Button"
                  onClick={handleUpdateCart}
                >
                  Confirmar
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
