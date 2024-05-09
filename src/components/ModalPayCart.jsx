/* eslint-disable react/prop-types */
import { useState } from "react";
// IMPORTAMOS EL CREADOR DEL PDF
import CreateTicket from "../PDF/CreateTicket";
// IMPORTAMOS LAS AYUDAS
import { generateFolio } from "../helpers/GenerateFolio";
// IMPORTAMOS EL LINK DE DESCARGAR
import { PDFDownloadLink } from "@react-pdf/renderer";
// IMPORTAMOS LOS HOOKS
import useGetAllEmployees from "../hooks/useGetAllEmployees";
// IMPORTAMOS LOS ESTILOS
import "../styles/ModalPayCart.css";

export default function ModalPayCart({
  cart,
  setCart,
  setShowModalPayCart,
  getCartAgain,
  setGetCartAgain,
}) {
  const { employeesExist } = useGetAllEmployees();
  const [showPDF, setShowPDF] = useState(false);

  const handleGenerateTicket = () => {
    const Folio = generateFolio();
    cart.map((product) => {
      product.MetodoDePago = document.querySelector("#payment").value;
      product.EmpleadoAsignado = document.querySelector("#employee").value;
      product.NumeroDeFolio = Folio;
    });
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowPDF(true);
  };

  const handleCloseModalPayCart = () => {
    setShowModalPayCart(false);
    setShowPDF(false);
  };

  const handleResetCart = () => {
    localStorage.removeItem("cart");
    setGetCartAgain(!getCartAgain);
    setShowModalPayCart(false);
    setShowPDF(false);
  };

  return (
    <main className="ModalPayCart">
      <div className="ModalPayCart__Container">
        <button
          className="ModalPayCart__Container__Close"
          onClick={showPDF ? handleResetCart : handleCloseModalPayCart}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalPayCart__Container__Title">
          {showPDF ? "Gracias por su compra" : "Finalizar venta"}
        </p>
        <hr className="ModalPayCart__Container__Divisor" />
        {showPDF ? (
          <PDFDownloadLink
            document={
              <CreateTicket
                cart={cart}
                getCartAgain={getCartAgain}
                setGetCartAgain={setGetCartAgain}
              />
            }
            fileName="TicketPago.pdf"
            className="ModalPayCart__Container__Form--Button"
          >
            Generar Ticket
          </PDFDownloadLink>
        ) : (
          <>
            <p className="ModalPayCart__Container__Subtitle">
              Seleccione el método de pago
            </p>
            <select
              className="ModalPayCart__Container__Select"
              id="payment"
              //   onChange={checkPayment}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>
            {/* {showInputAmount && (
          <>
          <p className="ModalPayCart__Container__Subtitle">Monto recibido</p>
          <input
            className="ModalPayCart__Container__Select"
            title="Solo se aceptan valores numericos"
          ></input>
          </>
          )} */}
            <p className="ModalPayCart__Container__Subtitle">
              Empleado asignado a la venta
            </p>
            <select className="ModalPayCart__Container__Select" id="employee">
              {employeesExist &&
                employeesExist.length > 0 &&
                employeesExist.map(({ Usuario, idUsuario }, index) => (
                  <option key={index} value={Usuario} id={idUsuario}>
                    {Usuario}
                  </option>
                ))}
            </select>
            {/* <PDFDownloadLink
            onClick={handleGenerateTicket}
            document={<CreateTicket cart={cart} />}
            fileName="TicketPago.pdf"
            className="ModalPayCart__Container__Form--Button"
          >
            Generar Ticket
          </PDFDownloadLink> */}
            <button
              className="ModalPayCart__Container__Form--Button"
              onClick={handleGenerateTicket}
            >
              Finalizar pago
            </button>
          </>
        )}
      </div>
    </main>
  );
}
