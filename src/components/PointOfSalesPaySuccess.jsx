/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesPaySuccess.css";

export default function PointOfSalesPaySuccess({
  urlTicket,
  cart,
  setShowCart,
  getCartAgain,
  setGetCartAgain,
}) {
  // OBTENEMOS EL SUBTOTAL DE LA COMPRA
  const getSubtotal = () => {
    let Subtotal = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    return Subtotal;
  };
  //
  const getTotal = () => {
    let Total = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    cart[0].PropinaCliente && (Total += cart[0].PropinaCliente);
    cart[0].OtrosServicios && (Total += cart[0].OtrosServicios);
    cart[0].idCita && (Total -= 150);
    return Total;
  };
  const { MetodoDePago } = cart[0];

  const today = new Date();
  const date = today.toLocaleString();

  const handleResetCart = () => {
    localStorage.removeItem("cart");
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
          Venta #921808
        </small>
      </span>
      <hr className="PointOfSalesPaySuccess__Cart--Divider" />
      <span className="PointOfSalesPaySuccess__Cart--PaymentDetails">
        <p className="PointOfSalesPaySuccess__Cart--PaymentDetails--Title">
          Medio de pago
        </p>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            {MetodoDePago}
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {getTotal().toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </small>
        </span>
        <p className="PointOfSalesPaySuccess__Cart--PaymentDetails--Title">
          Fecha: {date}
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
            {getSubtotal().toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </small>
        </span>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            Otros servicios:
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {cart[0].OtrosServicios?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }) ?? 0}
          </small>
        </span>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            Propina:
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {cart[0].PropinaCliente?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }) ?? 0}
          </small>
        </span>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            Descuento:
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {cart[0].idCita ? "$150.00" : "0"}
          </small>
        </span>
        <span className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle">
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Name">
            Total:
          </small>
          <small className="PointOfSalesPaySuccess__Cart--PaymentDetails--Subtitle--Value">
            {getTotal().toLocaleString("en-US", {
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
