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
import { toast } from "sonner";

export default function PointOfSalesPayMethodPayment({
  cart,
  setCart,
  setProgressPay,
  setUrlTicket,
  setTicketInformation,
}) {
  const { createTicket } = useGlobal();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [totalToPay, setTotalToPay] = useState(0);
  const [change, setChange] = useState(0);
  // const [showInputMoney, setShowInputMoney] = useState(false);
  // const [payment, setPayment] = useState(null);

  // OBTENEMOS EL TOTAL DE LA COMPRA
  const getTotal = () => {
    let total = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    cart[0].PropinaCliente && (total += cart[0].PropinaCliente);
    cart[0].Descuentos && (total -= cart[0].Descuentos);
    return total;
  };
  const getTotalImporte = () => {
    let total = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    return total;
  };

  // OBTENEMOS EL SUBTOTAL DE LA COMPRA
  const getSubtotal = () => {
    let Subtotal = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    return Subtotal;
  };

  // const classNameButtonMoney = showInputMoney
  //   ? "PointOfSalesPayMethodPayment__Cart__Header--Content--Button Active"
  //   : "PointOfSalesPayMethodPayment__Cart__Header--Content--Button";

  const handleUpdateCart = () => {
    const { totalEfectivo, totalTarjeta, totalTransferencia } =
      getInputValues();
    cart.map((currentItem) => {
      currentItem.TotalEfectivo = totalEfectivo;
      currentItem.TotalTarjeta = totalTarjeta;
      currentItem.TotalTransferencia = totalTransferencia;
      currentItem.TotalImporte = getTotalImporte();
      currentItem.TotalVenta = getTotal();
      currentItem.Subtotal = getSubtotal();
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
    handlePayCart(cart);
    addTicketInformation();
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
  const handleCheckMoney = () => {
    const montoRecibido = parseInt(
      document.querySelector("#MontoRecibido").value
    );
    const MontoCobrar = parseInt(document.querySelector("#MontoCobrar").value);
    const regexOnlyNumbers = /^[0-9]+$/;
    if (
      regexOnlyNumbers.test(montoRecibido) &&
      regexOnlyNumbers.test(MontoCobrar)
    ) {
      if (montoRecibido >= MontoCobrar) {
        setChange(montoRecibido - MontoCobrar);
      } else {
        setChange(0);
      }
    } else {
      toast.error("Solo se permiten valores numéricos ❌");
    }
  };
  const handleShowCalculator = () => {
    setShowCalculator(!showCalculator);
    setChange(0);
  };
  // const handleBackToMethodPayment = () => {
  //   setPayment("Efectivo");
  //   setShowInputMoney(!showInputMoney);
  //   setShowConfirm(false);
  // };
  const backToCart = () => {
    setProgressPay(1);
  };
  // const handleCreateTicket = (methodPayment) => {
  //   handleUpdateCart(methodPayment);
  //   addTicketInformation();
  // };
  const addTicketInformation = () => {
    const today = new Date();
    const date = today.toLocaleString();
    setTicketInformation({
      TotalVenta: getTotal(),
      Subtotal: getSubtotal(),
      Fecha: date,
      Propina: cart[0].PropinaCliente ?? 0,
      Anticipo: cart[0].Descuentos ?? 0,
      Efectivo: cart[0].TotalEfectivo > 0 ? true : false,
      Tarjeta: cart[0].TotalTarjeta > 0 ? true : false,
      Transferencia: cart[0].TotalTransferencia > 0 ? true : false,
      Folio: cart[0].NumeroDeFolio,
    });
  };

  const validateInputs = () => {
    const { totalEfectivo, totalTarjeta, totalTransferencia } =
      getInputValues();

    const regexOnlyNumbers = /^[0-9]+$/;
    if (
      regexOnlyNumbers.test(totalEfectivo) &&
      regexOnlyNumbers.test(totalTarjeta) &&
      regexOnlyNumbers.test(totalTransferencia)
    ) {
      const total =
        parseInt(totalEfectivo) +
        parseInt(totalTarjeta) +
        parseInt(totalTransferencia);
      setTotalToPay(total);
      if (total === getTotal()) {
        setShowConfirm(true);
      } else {
        setShowConfirm(false);
      }
    } else {
      toast.error(
        "Solo se permiten valores numéricos y no puede estar vacío ❌"
      );
      setShowConfirm(false);
    }
  };

  const getInputValues = () => {
    const totalEfectivo =
      document.querySelector("#Efectivo").value === ""
        ? 0
        : parseInt(document.querySelector("#Efectivo").value);
    const totalTarjeta =
      document.querySelector("#Tarjeta").value === ""
        ? 0
        : parseInt(document.querySelector("#Tarjeta").value);
    const totalTransferencia =
      document.querySelector("#Transferencia").value === ""
        ? 0
        : parseInt(document.querySelector("#Transferencia").value);
    return {
      totalEfectivo,
      totalTarjeta,
      totalTransferencia,
    };
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
          Métodos de pago
        </p>
      </header>
      <div className="PointOfSalesPayMethodPayment__Cart__Header--Content">
        <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Title Total">
          Total a pagar{" "}
          {getTotal().toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Title Total">
          Llevas un total de{" "}
          {totalToPay.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Title">
          Cantidad a pagar en efectivo:
        </p>
        <input
          type="text"
          placeholder="0"
          className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input"
          id="Efectivo"
          onChange={validateInputs}
        />
        <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Title">
          Cantidad a pagar con tarjeta:
        </p>
        <input
          type="text"
          placeholder="0"
          className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input"
          id="Tarjeta"
          onChange={validateInputs}
        />
        <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Title">
          Cantidad a pagar por transferencia:
        </p>
        <input
          type="text"
          placeholder="0"
          className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input"
          id="Transferencia"
          onChange={validateInputs}
        />
        {showConfirm && (
          <button
            className="PointOfSalesPayMethodPayment__Cart__Header--Content--Button"
            onClick={handleUpdateCart}
          >
            Continuar
          </button>
        )}
        <small className="PointOfSalesPayMethodPayment__Cart__Header--Content--Message">
          {`¡IMPORTANTE! El botón para "Continuar" se activará cuando la suma de los métodos de pago sea exactamente igual al total a pagar (${getTotal().toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          )})`}
        </small>
        <a
          className="PointOfSalesPayMethodPayment__Cart__Header--Content--Message Cambio"
          onClick={handleShowCalculator}
        >
          {showCalculator ? "Ocultar" : "Calcular cambio"}
        </a>
        {showCalculator && (
          <>
            <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Title">
              Calcular cambio
            </p>
            <span className="PointOfSalesPayMethodPayment__Cart__Header--Content--Calculator">
              <input
                type="text"
                placeholder="Monto recibido"
                className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input"
                id="MontoRecibido"
              />
              <input
                type="text"
                placeholder="Monto a cobrar"
                className="PointOfSalesPayMethodPayment__Cart__Header--Content--Input"
                id="MontoCobrar"
              />
            </span>
            <button
              className="PointOfSalesPayMethodPayment__Cart__Header--Content--Button"
              onClick={handleCheckMoney}
            >
              Calcular
            </button>
            <p className="PointOfSalesPayMethodPayment__Cart__Header--Content--Title">
              Cambio a dar:{" "}
              {change.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </>
        )}
        {/* <button
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
        )} */}
      </div>
    </section>
  );
}
