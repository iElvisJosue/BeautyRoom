/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import EmptyCart from "./EmptyCart";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
import { handleAddProductToCart } from "../helpers/HandleAddProductToCart";
import { handleSubtractProductToCart } from "../helpers/HandleSubtractProductToCart";
import { handleAddServiceToCart } from "../helpers/HandleAddServiceToCart";
import { handleSubtractServiceToCart } from "../helpers/HandleSubtractServiceToCart";

// IMPORTAMOS EL CREADOR DEL PDF
// import CreateTicket from "../PDF/CreateTicket";

// IMPORTAMOS EL LINK DE DESCARGAR
// import { PDFDownloadLink } from "@react-pdf/renderer";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesCart.css";

export default function PointOfSalesCart({
  cart,
  setCart,
  showCart,
  setShowCart,
  getCartAgain,
  setGetCartAgain,
  setShowModalPayCart,
}) {
  const classPointOfSalesCart = showCart
    ? "PointOfSalesCart Show"
    : "PointOfSalesCart";

  const handleSubtractCart = (Product) => {
    const { idProducto, idSubservicio } = Product;
    if (idProducto) {
      handleSubtractProductToCart(
        Product,
        cart,
        setCart,
        setShowCart,
        getCartAgain,
        setGetCartAgain
      );
    }
    if (idSubservicio) {
      handleSubtractServiceToCart(
        Product,
        cart,
        setCart,
        setShowCart,
        getCartAgain,
        setGetCartAgain
      );
    }
  };
  const handleAddCart = (Product) => {
    const { idProducto, idSubservicio } = Product;
    if (idProducto) {
      handleAddProductToCart(
        Product,
        cart,
        setCart,
        setShowCart,
        getCartAgain,
        setGetCartAgain
      );
    }
    if (idSubservicio) {
      handleAddServiceToCart(
        Product,
        cart,
        setCart,
        setShowCart,
        getCartAgain,
        setGetCartAgain
      );
    }
  };
  const handleDeleteCart = () => {
    localStorage.removeItem("cart");
    setGetCartAgain(!getCartAgain);
  };
  const getTotal = () => {
    const total = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    return total;
  };
  const getTotalItems = () => {
    const total = cart.reduce(
      (acc, product) => acc + product.CantidadEnCarrito,
      0
    );
    return total;
  };

  return (
    <aside className={classPointOfSalesCart}>
      <button
        className="PointOfSalesCart__Close"
        onClick={() => setShowCart(false)}
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>
      <header className="PointOfSalesCart__Header">
        <p className="PointOfSalesCart__Header--Title">Carrito</p>
        <p className="PointOfSalesCart__Header--Total">{getTotalItems()}</p>
      </header>
      <div className="PointOfSalesCart__Container">
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <section
              className="PointOfSalesCart__Container__Content"
              key={index}
            >
              <picture className="PointOfSalesCart__Container--Img">
                <img
                  src={`${HOST_IMG}/${product.ImagenProducto}`}
                  alt="Imagen representativa del producto"
                />
              </picture>
              <div className="PointOfSalesCart__Container--Details">
                <span className="PointOfSalesCart__Container--Details--NameAndPrice">
                  <p className="PointOfSalesCart__Container--Details--NameAndPrice--Name">
                    {product.NombreProducto}
                  </p>
                  <p className="PointOfSalesCart__Container--Details--NameAndPrice--Price">
                    ${product.PrecioTotal.toLocaleString()}
                  </p>
                </span>
                <span className="PointOfSalesCart__Container--Buttons">
                  <button
                    className="PointOfSalesCart__Container--Buttons--Subtract"
                    onClick={() => handleSubtractCart(product)}
                  >
                    -
                  </button>
                  <p className="PointOfSalesCart__Container--Buttons--Amount">
                    {product.CantidadEnCarrito}
                  </p>
                  <button
                    className="PointOfSalesCart__Container--Buttons--Add"
                    onClick={() => handleAddCart(product)}
                  >
                    +
                  </button>
                </span>
              </div>
            </section>
          ))
        ) : (
          <EmptyCart> No hay productos en el carrito</EmptyCart>
        )}
      </div>
      {cart.length > 0 && (
        <footer className="PointOfSalesCart__Footer">
          <button
            className="PointOfSalesCart__Footer--ButtonCancel"
            onClick={handleDeleteCart}
          >
            Cancelar Carrito
          </button>
          {/* <PDFDownloadLink
            document={<CreateTicket cart={cart} />}
            fileName="TicketPago.pdf"
            className="PointOfSalesCart__Footer--ButtonPay"
          >
            Pagar ${getTotal().toLocaleString()}
          </PDFDownloadLink> */}
          <button
            className="PointOfSalesCart__Footer--ButtonPay"
            onClick={() => setShowModalPayCart(true)}
          >
            Pagar ${getTotal().toLocaleString()}
          </button>
        </footer>
      )}
    </aside>
  );
}
