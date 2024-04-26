// LISTA DE MÉTODOS DE PAGO
const paymentsAdmin = ["Transferencia", "Efectivo", "Tarjeta Débito/Crédito"];
const paymentsClient = ["PayPal", "Transferencia"];

export const listOfPaymentsForAdmin = paymentsAdmin.map((service, index) => (
  <option key={index} value={service}>
    {service}
  </option>
));
export const listOfPaymentsForClient = paymentsClient.map((service, index) => (
  <option key={index} value={service}>
    {service}
  </option>
));
