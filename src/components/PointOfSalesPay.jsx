/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES
import PointOfSalesPayCart from "./PointOfSalesPayCart";
import PointOfSalesPayAssign from "./PointOfSalesPayAssign";
import PointOfSalesPayMethodPayment from "./PointOfSalesPayMethodPayment";
import PointOfSalesPaySuccess from "./PointOfSalesPaySuccess";

// IMPORTAMOS LOS HOOKS
import useProgressPay from "../hooks/useProgressPay";
import useTicketInformation from "../hooks/useTicketInformation";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesPay.css";

export default function PointOfSalesPay({
  cart,
  setCart,
  showCart,
  setShowCart,
  getCartAgain,
  setGetCartAgain,
  setShowModalPayCart,
  employeesExist,
}) {
  const { ticketInformation, setTicketInformation } = useTicketInformation();
  const classPointOfSalesPay = showCart
    ? "PointOfSalesPay Show"
    : "PointOfSalesPay";
  const { progressPay, setProgressPay } = useProgressPay();
  const [urlTicket, setUrlTicket] = useState(null);

  const pointOfSalesPayProps = {
    cart,
    setCart,
    showCart,
    setShowCart,
    getCartAgain,
    setGetCartAgain,
    setShowModalPayCart,
    progressPay,
    setProgressPay,
    employeesExist,
    setUrlTicket,
    urlTicket,
    setTicketInformation,
    ticketInformation,
  };

  const currentProgressPay = {
    0: PointOfSalesPayCart,
    1: PointOfSalesPayAssign,
    2: PointOfSalesPayMethodPayment,
    3: PointOfSalesPaySuccess,
  };

  const ProgressPayToRender = currentProgressPay[progressPay];

  return (
    <aside className={classPointOfSalesPay}>
      <ProgressPayToRender {...pointOfSalesPayProps} />
    </aside>
  );
}
