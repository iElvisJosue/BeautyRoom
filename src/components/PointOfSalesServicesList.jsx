/* eslint-disable react/prop-types */

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
import { handleAddServiceToCart } from "../helpers/HandleAddServiceToCart";

export default function PointOfSalesServicesList({
  Content,
  cart,
  setCart,
  getCartAgain,
  setGetCartAgain,
  setShowCart,
  employeesExist,
}) {
  const handleCart = (NombreServicio, Subservicio, ImagenServicio) => {
    Subservicio.ImagenProducto = ImagenServicio;
    Subservicio.CategoriaProducto = NombreServicio;
    Subservicio.NombreProducto = Subservicio.NombreSubservicio;
    employeesExist[0]
      ? (Subservicio.EmpleadoAsignado = employeesExist[0].Usuario)
      : "Sin asignar";
    handleAddServiceToCart(
      Subservicio,
      cart,
      setCart,
      setShowCart,
      getCartAgain,
      setGetCartAgain
    );
  };

  return (
    <div className="PointOfSalesServices__Container">
      {Content.map(
        ({ idServicio, NombreServicio, ImagenServicio, Subservicios }) => (
          <section className="PointOfSalesServices__Products" key={idServicio}>
            <p className="PointOfSalesServices__Products--Title">
              Servicios disponibles para{" "}
              <b>{NombreServicio.toLocaleUpperCase()}</b>
            </p>
            {Subservicios.map((Subservicio, index) => (
              <div
                className="PointOfSalesServices__Products--Container"
                key={index}
              >
                <picture className="PointOfSalesServices__Products--Container--Img">
                  <img
                    src={`${HOST_IMG}/${ImagenServicio}`}
                    alt="Imagen representativa del producto"
                  />
                </picture>
                <div className="PointOfSalesServices__Products--Container--Details">
                  <span className="PointOfSalesServices__Products--Container--NameAndPrice">
                    <p className="PointOfSalesServices__Products--Container--Name">
                      {Subservicio.NombreSubservicio}
                    </p>
                    <p className="PointOfSalesServices__Products--Container--Price">
                      {`$${Subservicio.CostoSubservicio.toLocaleString()} MXN`}
                    </p>
                  </span>
                </div>
                <button
                  className="PointOfSalesServices__Products--Container--Button"
                  onClick={() =>
                    handleCart(NombreServicio, Subservicio, ImagenServicio)
                  }
                >
                  Agregar al carrito <ion-icon name="cart"></ion-icon>
                </button>
              </div>
            ))}
          </section>
        )
      )}
    </div>
  );
}
