/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES
import PointOfSalesPayCart from "./PointOfSalesPayCart";
import PointOfSalesPayMethodPayment from "./PointOfSalesPayMethodPayment";
import PointOfSalesPaySuccess from "./PointOfSalesPaySuccess";

// IMPORTAMOS LOS HOOKS
import useProgressPay from "../hooks/useProgressPay";

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
  };

  const currentProgressPay = {
    0: PointOfSalesPayCart,
    1: PointOfSalesPayMethodPayment,
    2: PointOfSalesPaySuccess,
  };

  const ProgressPayToRender = currentProgressPay[progressPay];

  return (
    <aside className={classPointOfSalesPay}>
      <ProgressPayToRender {...pointOfSalesPayProps} />
    </aside>
  );
}
