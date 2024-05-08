export const handleAddServiceToCart = (
  Subservicio,
  cart,
  setCart,
  setShowCart,
  getCartAgain,
  setGetCartAgain
) => {
  // BUSCAMOS SI EL SERVICIO YA ESTA EN EL CARRITO
  const findService = cart.find(
    (currentItem) => currentItem?.idSubservicio === Subservicio.idSubservicio
  );
  // SI EXISTE, HACEMOS ESTO
  if (findService) {
    // SI LA CANTIDAD EN EL CARRITO ES MENOR A LA CANTIDAD DEL PRODUCTO
    // PODEMOS SEGUIR AGREGANDO EL PRODUCTO AL CARRITO
    const newCart = cart.map((currentItem) => {
      if (currentItem.idSubservicio === Subservicio.idSubservicio) {
        // SI EXISTE, AUMENTAMOS LA CANTIDAD
        currentItem.CantidadEnCarrito++;
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
  }
  // SI NO EXISTE, LO AGREGAMOS DIRECTAMENTE
  else {
    Subservicio.CantidadEnCarrito = 1;
    Subservicio.PrecioTotal = Subservicio.CostoSubservicio;
    setNewCart(
      [...cart, Subservicio],
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
