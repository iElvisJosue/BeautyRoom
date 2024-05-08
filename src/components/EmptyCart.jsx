/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/EmptyCart.css";

export default function EmptyCart({ children }) {
  return (
    <section className="EmptyCart">
      <img
        src="CarritoVacio.png"
        alt="Carrito Vacío"
        className="EmptyCart__Img"
      />
      <h1 className="EmptyCart__Title">{children}</h1>
    </section>
  );
}
