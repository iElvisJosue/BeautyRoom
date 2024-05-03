/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES A USAR
import NotResults from "./NotResults";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG_PRODUCTS } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminCategoryProductsList.css";

export default function AdminCategoryProductsList({
  categoriesAndProducts,
  setCurrentId,
  setOptionSubMenu,
  setShowModalDeleteProduct,
}) {
  const handleSectionAddProduct = (idServicio) => {
    setCurrentId(idServicio);
    setOptionSubMenu(2);
  };

  const handleEditProduct = (Producto) => {
    alert(Producto.idProducto);
    setCurrentId(Producto.idProducto);
  };

  const handleDeleteProduct = async (Producto) => {
    setCurrentId(Producto.idProducto);
    setShowModalDeleteProduct(true);
  };

  const handleCategory = (idCategoriaProducto) => {
    setCurrentId(idCategoriaProducto);
    alert(idCategoriaProducto);
  };

  return (
    <section className="AdminCategoryProductsList">
      {categoriesAndProducts?.length > 0 ? (
        categoriesAndProducts.map(
          ({ idCategoriaProducto, NombreCategoria, Productos }) => (
            <>
              <div className="AdminCategoryProductsList__Title">
                <span className="AdminCategoryProductsList__Title--Icon">
                  <img
                    src={`${HOST_IMG_PRODUCTS}/Categorias.png`}
                    alt="Icono de la categoría"
                  />
                  <p>
                    {NombreCategoria} ({Productos?.length} productos)
                  </p>
                </span>
                <button onClick={() => handleCategory(idCategoriaProducto)}>
                  <ion-icon name="brush-outline"></ion-icon>
                </button>
              </div>
              {Productos?.map((Producto, index) => (
                <div className="AdminCategoryProductsList__Details" key={index}>
                  <span className="AdminCategoryProductsList__Details--Details">
                    <img
                      src={`${HOST_IMG_PRODUCTS}/${Producto.ImagenProducto}`}
                      alt={`Icono del ${Producto.NombreProducto}`}
                    />
                    <p>Nombre: {Producto.NombreProducto}</p>
                    <p>
                      Precio (Venta): $
                      {Producto.PrecioProducto.toLocaleString()}
                    </p>
                    <p>Stock: {Producto.CantidadProducto}</p>
                  </span>
                  <span className="AdminCategoryProductsList__Details--Buttons">
                    <button onClick={() => handleEditProduct(Producto)}>
                      <ion-icon name="brush-outline"></ion-icon>
                    </button>
                    <button onClick={() => handleDeleteProduct(Producto)}>
                      <ion-icon name="trash-bin-outline"></ion-icon>
                    </button>
                  </span>
                </div>
              ))}
              <button
                className="AdminCategoryProductsList__Button"
                onClick={() => handleSectionAddProduct(idCategoriaProducto)}
              >
                Agregar Producto
              </button>
            </>
          )
        )
      ) : (
        <NotResults responsive> No hay categorías disponibles</NotResults>
      )}
    </section>
  );
}
