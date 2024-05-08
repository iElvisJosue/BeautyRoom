/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
import { handleAddProductToCart } from "../helpers/HandleAddProductToCart";

export default function PointOfSalesProductsList({
  Content,
  cart,
  setCart,
  getCartAgain,
  setGetCartAgain,
  setShowCart,
}) {
  const handleCart = (Product) => {
    handleAddProductToCart(
      Product,
      cart,
      setCart,
      setShowCart,
      getCartAgain,
      setGetCartAgain
    );
  };

  return (
    <div className="PointOfSalesProducts__Container">
      {Content.map(({ idCategoriaProducto, NombreCategoria, Productos }) => (
        <section
          className="PointOfSalesProducts__Products"
          key={idCategoriaProducto}
        >
          <p className="PointOfSalesProducts__Products--Title">
            Productos de la categoría{" "}
            <b>{NombreCategoria.toLocaleUpperCase()}</b>
          </p>
          {Productos.map((Producto, index) => (
            <div
              className="PointOfSalesProducts__Products--Container"
              key={index}
            >
              <picture className="PointOfSalesProducts__Products--Container--Img">
                <img
                  src={`${HOST_IMG}/${Producto.ImagenProducto}`}
                  alt="Imagen representativa del producto"
                />
                {Producto.DescuentoProducto > 0 && (
                  <span className="PointOfSalesProducts__Products--Container--Discount">
                    - {Producto.DescuentoProducto}%
                  </span>
                )}
              </picture>
              <div className="PointOfSalesProducts__Products--Container--Details">
                <span className="PointOfSalesProducts__Products--Container--NameAndPrice">
                  <p className="PointOfSalesProducts__Products--Container--Name">
                    {Producto.NombreProducto}
                  </p>
                  <p
                    className={`PointOfSalesProducts__Products--Container--Price ${
                      Producto.DescuentoProducto ? "Discount" : ""
                    }`}
                  >
                    {`$${Producto.PrecioProductoConDescuento.toLocaleString()} MXN`}
                  </p>
                </span>
                <p className="PointOfSalesProducts__Products--Container--Description">
                  {Producto.DescripcionProducto}
                </p>
                <p className="PointOfSalesProducts__Products--Container--Stock">
                  Disponibles: {Producto.CantidadProducto}
                </p>
              </div>
              {Producto.CantidadProducto > 0 && (
                <button
                  className="PointOfSalesProducts__Products--Container--Button"
                  onClick={() => handleCart(Producto)}
                >
                  Agregar al carrito <ion-icon name="cart"></ion-icon>
                </button>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
