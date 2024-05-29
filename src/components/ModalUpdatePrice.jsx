/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERías A USAR
import { useEffect } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalUpdatePrice.css";

export default function ModalUpdatePrice({
  cart,
  setCart,
  getCartAgain,
  setGetCartAgain,
  setShowModalUpdatePrice,
  productToUpdate,
}) {
  useEffect(() => {
    const { idProducto, idSubservicio } = productToUpdate;
    const setValue = (currentValue) => {
      document.querySelector("#NuevoPrecio").value = currentValue;
    };
    if (idProducto) {
      const currentProduct = cart.find(
        (product) => product.idProducto === idProducto
      );
      setValue(currentProduct?.PrecioProductoConDescuento);
    } else {
      const currentSubservice = cart.find(
        (product) => product.idSubservicio === idSubservicio
      );
      setValue(currentSubservice?.CostoSubservicio);
    }
    // const currentSubservice = cart.find(
    //   ({ idSubservicio }) => idSubservicio === productToUpdate
    // );
    // const currentProduct = cart.find(
    //   ({ idProducto }) => idProducto === productToUpdate
    // );
    // document.querySelector("#NuevoPrecio").value =
    //   currentSubservice?.CostoSubservicio ??
    //   currentProduct?.PrecioProductoConDescuento;
  }, []);

  const handleUpdatePrice = () => {
    const newPrice = document.querySelector("#NuevoPrecio").value;
    const regexOnlyNumbers = /^[0-9]+$/;
    if (regexOnlyNumbers.test(newPrice) && newPrice !== "") {
      cart.map((product) => {
        if (product.idSubservicio) {
          if (product.idSubservicio === productToUpdate.idSubservicio) {
            return (
              // ACTUALIZAMOS EL NUEVO PRECIO
              (product.CostoSubservicio = parseInt(newPrice)),
              // ACTUALIZAMOS EL PRECIO TOTAL
              (product.PrecioTotal =
                product.CostoSubservicio * product.CantidadEnCarrito)
            );
          }
        } else {
          if (product.idProducto === productToUpdate.idProducto) {
            return (
              // ACTUALIZAMOS EL NUEVO PRECIO
              (product.PrecioProductoConDescuento = parseInt(newPrice)),
              // ACTUALIZAMOS EL PRECIO TOTAL
              (product.PrecioTotal =
                product.PrecioProductoConDescuento * product.CantidadEnCarrito)
            );
          }
        }

        return product;
      });
      setCart(cart);
      setGetCartAgain(!getCartAgain);
      setShowModalUpdatePrice(false);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Precio actualizado correctamente ✔️");
    } else {
      toast.error(
        "Solo se permiten valores numéricos y no puede estar vació ❌"
      );
    }
  };

  return (
    <main className="ModalUpdatePrice">
      <div className="ModalUpdatePrice__Container">
        <button
          className="ModalUpdatePrice__Container__Close"
          onClick={() => setShowModalUpdatePrice(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalUpdatePrice__Container__Title">Actualizar precio</p>
        <hr className="ModalUpdatePrice__Container__Divisor" />
        <p className="ModalUpdatePrice__Container__Text">
          Ingresa el nuevo precio
        </p>
        <input
          type="text"
          className="ModalUpdatePrice__Container__Form--Input"
          id="NuevoPrecio"
        />
        <button
          className="ModalUpdatePrice__Container__Form--Button"
          onClick={handleUpdatePrice}
        >
          Actualizar
        </button>
      </div>
    </main>
  );
}
