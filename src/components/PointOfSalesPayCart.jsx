/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import EmptyCart from "./EmptyCart";

// IMPORTAMOS LAS AYUDAS
import { handleAddProductToCart } from "../helpers/HandleAddProductToCart";
import { handleSubtractProductToCart } from "../helpers/HandleSubtractProductToCart";
import { handleAddServiceToCart } from "../helpers/HandleAddServiceToCart";
import { handleSubtractServiceToCart } from "../helpers/HandleSubtractServiceToCart";
import { generateFolio } from "../helpers/GenerateFolio";
import { HOST_IMG } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesPayCart.css";

export default function PointOfSalesPayCart({
  cart,
  setCart,
  setShowCart,
  getCartAgain,
  setGetCartAgain,
  setProgressPay,
  employeesExist,
}) {
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
  const handleUpdateCart = () => {
    const Folio = generateFolio();
    cart.map((product) => {
      // product.MetodoDePago = document.querySelector("#payment").value;
      product.EmpleadoAsignado = document.querySelector("#employee").value;
      product.NumeroDeFolio = Folio;
    });
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setProgressPay(1);
  };

  return (
    <>
      <button
        className="PointOfSalesPay__Cart__Close"
        onClick={() => setShowCart(false)}
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>
      <header className="PointOfSalesPay__Cart__Header">
        <p className="PointOfSalesPay__Cart__Header--Title">Carrito</p>
        <p className="PointOfSalesPay__Cart__Header--Total">
          {getTotalItems()}
        </p>
      </header>
      <div className="PointOfSalesPay__Cart__Container">
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <section
              className="PointOfSalesPay__Cart__Container__Content"
              key={index}
            >
              <picture className="PointOfSalesPay__Cart__Container--Img">
                <img
                  src={`${HOST_IMG}/${product.ImagenProducto}`}
                  alt="Imagen representativa del producto"
                />
              </picture>
              <div className="PointOfSalesPay__Cart__Container--Details">
                <span className="PointOfSalesPay__Cart__Container--Details--NameAndPrice">
                  <p className="PointOfSalesPay__Cart__Container--Details--NameAndPrice--Name">
                    {product.NombreProducto}
                  </p>
                  <p className="PointOfSalesPay__Cart__Container--Details--NameAndPrice--Price">
                    ${product.PrecioTotal.toLocaleString()}
                  </p>
                </span>
                <span className="PointOfSalesPay__Cart__Container--Buttons">
                  <button
                    className="PointOfSalesPay__Cart__Container--Buttons--Subtract"
                    onClick={() => handleSubtractCart(product)}
                  >
                    -
                  </button>
                  <p className="PointOfSalesPay__Cart__Container--Buttons--Amount">
                    {product.CantidadEnCarrito}
                  </p>
                  <button
                    className="PointOfSalesPay__Cart__Container--Buttons--Add"
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
        <footer className="PointOfSalesPay__Cart__Footer">
          <span className="PointOfSalesPay__Cart__Footer--Employees">
            <p className="PointOfSalesPay__Cart__Footer--Employees--Text">
              Asignar empleado
            </p>
            <select
              className="PointOfSalesPay__Cart__Footer--Employees--Select"
              id="employee"
            >
              {employeesExist &&
                employeesExist.map((employee) => (
                  <option value={employee.Usuario} key={employee.idUsuario}>
                    {employee.Usuario}
                  </option>
                ))}
            </select>
          </span>
          <span className="PointOfSalesPay__Cart__Footer--Buttons">
            <button
              className="PointOfSalesPay__Cart__Footer--ButtonCancel"
              onClick={handleDeleteCart}
            >
              Cancelar Carrito
            </button>
            <button
              className="PointOfSalesPay__Cart__Footer--ButtonPay"
              onClick={handleUpdateCart}
            >
              Pagar ${getTotal().toLocaleString()}
            </button>
          </span>
        </footer>
      )}{" "}
    </>
  );
}
