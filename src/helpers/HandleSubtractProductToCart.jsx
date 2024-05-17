// IMPORTAMOS LOS COMPONENTES A USAR
import { toast } from "sonner";

export const handleSubtractProductToCart = (
  Product,
  cart,
  setCart,
  setShowCart,
  getCartAgain,
  setGetCartAgain
) => {
  // BUSCAMOS SI EL PRODUCTO YA ESTA EN EL CARRITO
  const findProduct = cart.find(
    (currentItem) => currentItem?.idProducto === Product.idProducto
  );
  if (findProduct.CantidadEnCarrito > 1) {
    const newCart = cart.map((currentItem) => {
      if (currentItem.idProducto === Product.idProducto) {
        // SI EXISTE, DISMINUIMOS LA CANTIDAD
        currentItem.CantidadEnCarrito--;
        // ACTUALIZAMOS EL PRECIO
        currentItem.PrecioTotal =
          currentItem.PrecioProductoConDescuento *
          currentItem.CantidadEnCarrito;
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
      if (currentItem.idProducto != Product.idProducto) {
        return currentItem;
      }
    });
    toast.success("Un producto fue removido del carrito correctamente ✅");
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
