// IMPORTAMOS LOS COMPONENTES A USAR
import { toast } from "sonner";

export const handleSubtractServiceToCart = (
  Product,
  cart,
  setCart,
  setShowCart,
  getCartAgain,
  setGetCartAgain
) => {
  // BUSCAMOS SI EL PRODUCTO YA ESTA EN EL CARRITO
  const findService = cart.find(
    (currentItem) => currentItem?.idSubservicio === Product.idSubservicio
  );
  if (findService.CantidadEnCarrito > 1) {
    const newCart = cart.map((currentItem) => {
      if (currentItem.idSubservicio === Product.idSubservicio) {
        // SI EXISTE, DISMINUIMOS LA CANTIDAD
        currentItem.CantidadEnCarrito--;
        // ACTUALIZAMOS EL PRECIO
        currentItem.PrecioTotal =
          currentItem.CostoSubservicio * currentItem.CantidadEnCarrito;
      }
      return currentItem;
    });
    // ACTUALIZAMOS EL CARRITO
    setNewCart(
      [...newCart],
      setShowCart,
      setCart,
      getCartAgain,
      setGetCartAgain
    );
  } else {
    const newCart = cart.filter((currentItem) => {
      if (currentItem.idSubservicio != Product.idSubservicio) {
        return currentItem;
      }
    });
    toast.success("Un subservcio fue removido del carrito correctamente ✅");
    // ACTUALIZAMOS EL CARRITO
    setNewCart(
      [...newCart],
      setShowCart,
      setCart,
      getCartAgain,
      setGetCartAgain
    );
  }
};
const setNewCart = (
  newItem,
  setShowCart,
  setCart,
  getCartAgain,
  setGetCartAgain
) => {
  newItem.map((currentItem) => {
    delete currentItem.PropinaCliente;
  });
  setShowCart(true);
  setCart(newItem);
  setGetCartAgain(!getCartAgain);
  localStorage.setItem("cart", JSON.stringify(newItem));
};
