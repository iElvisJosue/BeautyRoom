// IMPORTAMOS LOS COMPONENTES A USAR
import { toast } from "sonner";

export const handleAddProductToCart = (
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
  // SI EXISTE, HACEMOS ESTO
  if (findProduct) {
    // SI LA CANTIDAD EN EL CARRITO ES MENOR A LA CANTIDAD DEL PRODUCTO
    // PODEMOS SEGUIR AGREGANDO EL PRODUCTO AL CARRITO
    if (findProduct.CantidadEnCarrito < findProduct.CantidadProducto) {
      const newCart = cart.map((currentItem) => {
        if (currentItem.idProducto === Product.idProducto) {
          // SI EXISTE, AUMENTAMOS LA CANTIDAD
          currentItem.CantidadEnCarrito++;
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
      toast.error("No hay más stock de este producto disponible ❌");
    }
  }
  // SI NO EXISTE, LO AGREGAMOS DIRECTAMENTE
  else {
    Product.CantidadEnCarrito = 1;
    Product.PrecioTotal = Product.PrecioProductoConDescuento;
    setNewCart(
      [...cart, Product],
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
  setShowCart(true);
  setCart(newItem);
  setGetCartAgain(!getCartAgain);
  localStorage.setItem("cart", JSON.stringify(newItem));
};
