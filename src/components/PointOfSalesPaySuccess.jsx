/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesPaySuccess.css";

export default function PointOfSalesPaySuccess({
  urlTicket,
  // cart,
  setShowCart,
  getCartAgain,
  setGetCartAgain,
  ticketInformation,
}) {
  const {
    Anticipo,
    Fecha,
    Propina,
    TotalVenta,
    Subtotal,
    Efectivo,
    Tarjeta,
    Transferencia,
    Folio,
  } = ticketInformation;

  localStorage.removeItem("cart");

  const handleResetCart = () => {
    setGetCartAgain(!getCartAgain);
    setShowCart(false);
  };
  return (
    <section className="PointOfSalesPaySuccess__Cart">
      <img
        src="PagoExitoso.png"
        alt="Icono De Pago"
        className="PointOfSalesPaySuccess__Cart--Img"
      />
      <span className="PointOfSalesPaySuccess__Cart--Text">
        <p className="PointOfSalesPaySuccess__Cart--Text--Title">
          El pago se realizó con éxito
        </p>
        <small className="PointOfSalesPaySuccess__Cart--Text--Subtitle">
          Folio Venta {Folio}
        </small>
      </span>
      <hr className="PointOfSalesPaySuccess__Cart--Divider" />
      <span className="PointOfSalesPaySuccess__Cart--PaymentDetails">
        <p className="PointOfSalesPaySuccess__Cart--PaymentDetails--Title">
          Medio de pago
        </p>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            {`${Efectivo ? "Efectivo " : ""} ${Tarjeta ? "Tarjeta " : ""} ${
              Transferencia ? "Transferencia " : ""
            }`}
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {TotalVenta.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </small>
        </span>
        <p className="PointOfSalesPaySuccess__Cart--PaymentDetails--Title">
          Fecha: {Fecha}
        </p>
      </span>
      <hr className="PointOfSalesPaySuccess__Cart--Divider" />
      <span className="PointOfSalesPaySuccess__Cart--PaymentDetails">
        <p className="PointOfSalesPaySuccess__Cart--PaymentDetails--Title">
          Detalle de pago
        </p>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            Subtotal:
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {Subtotal.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </small>
        </span>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            Propina:
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {Propina.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </small>
        </span>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            Anticipo:
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            -
            {Anticipo.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </small>
        </span>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            Total:
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {TotalVenta.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </small>
        </span>
      </span>
      <hr className="PointOfSalesPaySuccess__Cart--Divider" />
      <button
        className="PointOfSalesPaySuccess__Cart--PaymentDetails--Button"
        onClick={() => window.open(urlTicket, "_blank")}
      >
        Ver Ticket
      </button>
      <button
        className="PointOfSalesPaySuccess__Cart--PaymentDetails--Button"
        onClick={handleResetCart}
      >
        Cerrar
      </button>
    </section>
  );
}
