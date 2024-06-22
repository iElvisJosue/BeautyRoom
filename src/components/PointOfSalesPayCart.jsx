/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
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
  employeesExist,
  setShowModalUpdatePrice,
  setProductToUpdate,
}) {
  // REINICIAMOS LOS VALORES DEL EMPLEADO ASIGNADO
  useEffect(() => {
    cart.map((currentItem) => {
      currentItem.EmpleadoAsignado = employeesExist[0].Usuario;
    });
    handleUpdateCart(cart);
  }, []);
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
    cart[0].PropinaCliente && (total += cart[0].PropinaCliente);
    cart[0].Descuentos && (total -= cart[0].Descuentos);
    return total;
  };
  const getTotalItems = () => {
    const total = cart.reduce(
      (acc, product) => acc + product.CantidadEnCarrito,
      0
    );
    return total;
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
    const regexOnlyNumbersAndDash = /^[0-9-]+$/;
    if (regexOnlyNumbersAndDash.test(value)) {
      try {
        const res = await validateDateFolio({ NumeroDeFolio: value });
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          handleAddDateToCart(res.data);
        }
      } catch (error) {
        const { status, message } = error.response;
        handleResponseMessages({ status, message });
      }
    } else {
      toast.error("Solo se permiten valores numéricos y guiones ❌");
    }
  };
  const handleAddDateToCart = (data) => {
    const { foliosCitas, costoTotalCitas } = data;
    const totalCitas = costoTotalCitas.reduce(
      (acc, product) => acc + product,
      0
    );
    toast.success(
      "Citas validadas correctamente, el descuento ha sido aplicado ✔️"
    );
    cart.map((currentItem) => {
      currentItem.idCita = foliosCitas[0];
      currentItem.Descuentos = totalCitas;
      currentItem.PreciosCitas = costoTotalCitas;
    });
    handleUpdateCart(cart);
  };
  const handleDeleteDate = () => {
    toast.success("Cita eliminada correctamente ✔️");
    cart.map((currentItem) => {
      delete currentItem.idCita;
      delete currentItem.Descuentos;
      delete currentItem.PreciosCitas;
    });
    handleUpdateCart(cart);
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
  const handleUpdateEmployeeAssigned = (e, product) => {
    const { idSubservicio } = product;
    // SI EL PRODUCTO ES UN SERVICIO, BUSCAMOS EL ID DEL SERVICIO
    if (idSubservicio) {
      cart.map((currentItem) => {
        currentItem.EmpleadoAsignado =
          currentItem.idSubservicio === product.idSubservicio
            ? e.target.value
            : currentItem.EmpleadoAsignado;
      });
    }
    // DE LO CONTRARIO, BUSCAMOS EL ID DEL PRODUCTO
    else {
      cart.map((currentItem) => {
        currentItem.EmpleadoAsignado =
          currentItem.idProducto === product.idProducto
            ? e.target.value
            : currentItem.EmpleadoAsignado;
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setGetCartAgain(!getCartAgain);
  };
  const handleUpdatePriceProduct = (idItem) => {
    setShowModalUpdatePrice(true);
    setProductToUpdate(idItem);
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
              <button
                className="PointOfSalesPay__Cart__Container__Content--ChangePrice"
                onClick={() => handleUpdatePriceProduct(product)}
              >
                <ion-icon name="repeat-outline"></ion-icon>
              </button>
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
                <div className="PointOfSalesPay__Cart__Container--Buttons">
                  <span>
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
                  <select
                    type="text"
                    id={product.idSubservicio ?? product.idProducto}
                    onChange={(e) => handleUpdateEmployeeAssigned(e, product)}
                  >
                    {employeesExist &&
                      employeesExist.map((employee) => (
                        <option
                          value={employee.Usuario}
                          key={employee.idUsuario}
                        >
                          {employee.Usuario}
                        </option>
                      ))}
                  </select>
                </div>
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
              {cart[0].Descuentos >= 0 ? (
                <div className="PointOfSalesPay__Cart__Footer--SuccessDiscount">
                  <p className="PointOfSalesPay__Cart__Footer--SuccessDiscount--Title">
                    Cita {cart[0].idCita.map((idCita) => `#${idCita} `)}
                    agregada: ($
                    {cart[0].Descuentos}.00)
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
              {cart[0].PropinaCliente >= 0 ? (
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
