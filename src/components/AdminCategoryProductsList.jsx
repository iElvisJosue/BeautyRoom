/* eslint-disable react/prop-types */

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProducts } from "../context/ProductsContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import NotResults from "./NotResults";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminCategoryProductsList.css";

export default function AdminCategoryProductsList({
  categoriesAndProducts,
  setCurrentId,
  setOptionSubMenu,
  setShowModalDeleteProduct,
  setShowModalEditCategory,
  getCategoriesAndProductsAgain,
  setGetCategoriesAndProductsAgain,
}) {
  const { deleteCategory } = useProducts();

  const handleSectionAddProduct = (idServicio) => {
    setCurrentId(idServicio);
    setOptionSubMenu(2);
  };

  const handleEditProduct = (Producto) => {
    setCurrentId(Producto);
    setOptionSubMenu(3);
  };

  const handleDeleteProduct = async (Producto) => {
    setCurrentId(Producto.idProducto);
    setShowModalDeleteProduct(true);
  };

  const handleCategory = (category) => {
    setCurrentId(category);
    setShowModalEditCategory(true);
  };

  const handleDeleteService = async (idCategoriaProducto) => {
    try {
      const res = await deleteCategory(idCategoriaProducto);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setGetCategoriesAndProductsAgain(!getCategoriesAndProductsAgain);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <section className="AdminCategoryProductsList">
      {categoriesAndProducts?.length > 0 ? (
        categoriesAndProducts.map((category) => (
          <>
            <div className="AdminCategoryProductsList__Title">
              <span className="AdminCategoryProductsList__Title--Icon">
                <img
                  src={`${HOST_IMG}/Categorias.png`}
                  alt="Icono de la categoría"
                />
                <p>
                  {category.NombreCategoria} ({category.Productos?.length}{" "}
                  productos)
                </p>
              </span>
              <span className="AdminCategoryProductsList__Title--Buttons">
                <button
                  onClick={() => handleCategory(category)}
                  className="AdminCategoryProductsList__Title--Buttons--Button Edit"
                >
                  <ion-icon name="brush-outline"></ion-icon>
                </button>
                {/* SI NO HAY PRODUCTOS EN L A CATEGORIA, PODEMOS ELIMINARLA */}
                {category.Productos?.length === 0 && (
                  <button
                    onClick={() =>
                      handleDeleteService(category.idCategoriaProducto)
                    }
                    className="AdminCategoryProductsList__Title--Buttons--Button Delete"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                )}
              </span>
            </div>
            {category.Productos?.map((Producto, index) => (
              <div className="AdminCategoryProductsList__Details" key={index}>
                <span className="AdminCategoryProductsList__Details--Details">
                  <img
                    src={`${HOST_IMG}/${Producto.ImagenProducto}`}
                    alt={`Icono del ${Producto.NombreProducto}`}
                  />
                  <p>Nombre: {Producto.NombreProducto}</p>
                  <p>
                    Precio (Venta): ${Producto.PrecioProducto.toLocaleString()}
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
              onClick={() =>
                handleSectionAddProduct(category.idCategoriaProducto)
              }
            >
              Agregar Producto
            </button>
          </>
        ))
      ) : (
        <NotResults responsive> No hay categorías disponibles</NotResults>
      )}
    </section>
  );
}
