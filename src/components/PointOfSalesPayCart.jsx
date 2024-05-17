/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import EmptyCart from "./EmptyCart";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";
import { handleAddProductToCart } from "../helpers/HandleAddProductToCart";
import { handleSubtractProductToCart } from "../helpers/HandleSubtractProductToCart";
import { handleAddServiceToCart } from "../helpers/HandleAddServiceToCart";
import { handleSubtractServiceToCart } from "../helpers/HandleSubtractServiceToCart";
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
}) {
  const { validateDateFolio } = useDates();
  const [optionsDiscount, setOptionsDiscount] = useState(false);
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
  const getTotal = () => {
    let total = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    cart[0].OtrosServicios && (total += cart[0].OtrosServicios);
    cart[0].PropinaCliente && (total += cart[0].PropinaCliente);
    cart[0].idCita && (total -= 150);
    return total;
  };
  const getTotalItems = () => {
    const total = cart.reduce(
      (acc, product) => acc + product.CantidadEnCarrito,
      0
    );
    return total;
  };
  const handleAddOtherServiceToCart = () => {
    const value = document.querySelector("#OtroServicios").value;
    const regexOnlyNumbers = /^[0-9]+$/;
    if (regexOnlyNumbers.test(value)) {
      cart.map((currentItem) => {
        currentItem.OtrosServicios = parseInt(value);
        delete currentItem.PropinaCliente;
      });
      toast.success("Otros Servicios agregados correctamente ✔️");
      handleUpdateCart(cart);
    } else {
      toast.error("Solo se permiten valores numéricos ❌");
    }
  };
  const handleDeleteOtherService = () => {
    toast.success("Otros Servicios eliminados correctamente ✔️");
    cart.map((currentItem) => {
      delete currentItem.OtrosServicios;
      delete currentItem.PropinaCliente;
    });
    handleUpdateCart(cart);
  };
  const handleDeleteDate = () => {
    toast.success("Cita eliminada correctamente ✔️");
    cart.map((currentItem) => {
      delete currentItem.idCita;
      delete currentItem.PropinaCliente;
    });
    handleUpdateCart(cart);
  };
  const handleAppTipPercentage = () => {
    const value = document.querySelector("#PropinaCliente").value;
    handleAddTipClientToCart(value, "%");
  };
  const handleAppTipFixed = () => {
    const value = document.querySelector("#PropinaCliente").value;
    handleAddTipClientToCart(value, "$");
  };
  const handleAddTipClientToCart = (value, type) => {
    const regexOnlyNumbers = /^[0-9]+$/;
    if (regexOnlyNumbers.test(value)) {
      let calculatedTip = cart.reduce(
        (acc, product) => acc + product.PrecioTotal,
        0
      );
      cart[0].OtrosServicios && (calculatedTip += cart[0].OtrosServicios);
      const tipValue =
        type === "$" ? parseInt(value) : (calculatedTip / 100) * value;
      cart.map((currentItem) => {
        currentItem.PropinaCliente = cart[0].PropinaCliente
          ? cart[0].PropinaCliente
          : tipValue;
      });

      toast.success("Propina agregada correctamente ✔️");
      handleUpdateCart(cart);
    } else {
      toast.error("Solo se permiten valores numéricos ❌");
    }
  };
  const handleDeleteTipClient = () => {
    toast.success("Propina eliminada correctamente ✔️");
    cart.map((currentItem) => {
      delete currentItem.PropinaCliente;
    });
    handleUpdateCart(cart);
  };
  const handleValidateDate = async () => {
    const value = document.querySelector("#FolioCita").value;
    try {
      const res = await validateDateFolio({ NumeroDeFolio: value });
      handleAddDateToCart(res.data);
    } catch (error) {
      const { status, message } = error.response;
      handleResponseMessages({ status, message });
    }
  };
  const handleAddDateToCart = (data) => {
    if (data.length > 0) {
      toast.success(
        "Cita validada correctamente, el descuento ha sido aplicado ✔️"
      );
      cart.map((currentItem) => {
        currentItem.idCita = data[0].idCita;
        delete currentItem.PropinaCliente;
      });
      handleUpdateCart(cart);
    } else {
      toast.error(
        "No hay cita activa para este folio, por favor introduzca un nuevo folio ❌"
      );
    }
  };
  const handleUpdateCart = (cart) => {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setGetCartAgain(!getCartAgain);
  };
  const handleDeleteCart = () => {
    localStorage.removeItem("cart");
    setGetCartAgain(!getCartAgain);
  };

  const iconName = optionsDiscount ? "caret-down-outline" : "caret-up-outline";

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
                    {product.PrecioTotal.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
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
          {optionsDiscount && (
            <>
              {cart[0].idCita ? (
                <div className="PointOfSalesPay__Cart__Footer--SuccessDiscount">
                  <p className="PointOfSalesPay__Cart__Footer--SuccessDiscount--Title">
                    Cita agregada: (-$150.00)
                  </p>
                  <button
                    className="PointOfSalesPay__Cart__Footer--SuccessDiscount--Button"
                    onClick={handleDeleteDate}
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                </div>
              ) : (
                <div className="PointOfSalesPay__Cart__Footer--Inputs">
                  <p className="PointOfSalesPay__Cart__Footer--Inputs--Title">
                    Buscar cita
                  </p>
                  <span className="PointOfSalesPay__Cart__Footer--Inputs--Container">
                    <input
                      type="text"
                      name="FolioCita"
                      id="FolioCita"
                      placeholder="Ingresa el folio de la cita"
                      className="PointOfSalesPay__Cart__Footer--Inputs--Container--Input"
                    />
                    <button
                      className="PointOfSalesPay__Cart__Footer--Inputs--Container--Button"
                      onClick={handleValidateDate}
                    >
                      Buscar
                    </button>
                  </span>
                </div>
              )}
              {cart[0].OtrosServicios ? (
                <div className="PointOfSalesPay__Cart__Footer--SuccessDiscount">
                  <p className="PointOfSalesPay__Cart__Footer--SuccessDiscount--Title">
                    Otros servicios: (
                    {cart[0].OtrosServicios.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    )
                  </p>
                  <button
                    className="PointOfSalesPay__Cart__Footer--SuccessDiscount--Button"
                    onClick={handleDeleteOtherService}
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                </div>
              ) : (
                <div className="PointOfSalesPay__Cart__Footer--Inputs">
                  <p className="PointOfSalesPay__Cart__Footer--Inputs--Title">
                    Otros servicios
                  </p>
                  <span className="PointOfSalesPay__Cart__Footer--Inputs--Container">
                    <input
                      type="text"
                      name="OtroServicios"
                      id="OtroServicios"
                      placeholder="Ingresa la cantidad"
                      className="PointOfSalesPay__Cart__Footer--Inputs--Container--Input"
                    />
                    <button
                      className="PointOfSalesPay__Cart__Footer--Inputs--Container--Button"
                      onClick={handleAddOtherServiceToCart}
                    >
                      Agregar
                    </button>
                  </span>
                </div>
              )}
              {cart[0].PropinaCliente ? (
                <div className="PointOfSalesPay__Cart__Footer--SuccessDiscount">
                  <p className="PointOfSalesPay__Cart__Footer--SuccessDiscount--Title">
                    Propina: (
                    {cart[0].PropinaCliente.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    )
                  </p>
                  <button
                    className="PointOfSalesPay__Cart__Footer--SuccessDiscount--Button"
                    onClick={handleDeleteTipClient}
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                </div>
              ) : (
                <div className="PointOfSalesPay__Cart__Footer--Inputs">
                  <p className="PointOfSalesPay__Cart__Footer--Inputs--Title">
                    Propina
                  </p>
                  <span className="PointOfSalesPay__Cart__Footer--Inputs--Container">
                    <input
                      type="text"
                      name="PropinaCliente"
                      id="PropinaCliente"
                      placeholder="Monto fijo o porcentaje"
                      className="PointOfSalesPay__Cart__Footer--Inputs--Container--Input"
                      maxLength="3"
                    />
                    <button
                      className="PointOfSalesPay__Cart__Footer--Inputs--Container--Button"
                      onClick={handleAppTipPercentage}
                    >
                      %
                    </button>
                    <button
                      className="PointOfSalesPay__Cart__Footer--Inputs--Container--Button"
                      onClick={handleAppTipFixed}
                    >
                      $
                    </button>
                  </span>
                </div>
              )}
            </>
          )}
          <button
            className="PointOfSalesPay__Cart__Footer--ShowDiscount"
            onClick={() => setOptionsDiscount(!optionsDiscount)}
          >
            <ion-icon name={iconName}></ion-icon>
          </button>
          <span className="PointOfSalesPay__Cart__Footer--Buttons">
            <button
              className="PointOfSalesPay__Cart__Footer--ButtonCancel"
              onClick={handleDeleteCart}
            >
              Cancelar Carrito
            </button>
            <button
              className="PointOfSalesPay__Cart__Footer--ButtonPay"
              onClick={() => setProgressPay(1)}
            >
              Pagar{" "}
              {getTotal().toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </button>
          </span>
        </footer>
      )}{" "}
    </>
  );
}
