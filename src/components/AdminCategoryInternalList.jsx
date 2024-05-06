/* eslint-disable react/prop-types */

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInternal } from "../context/InternalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import NotResults from "./NotResults";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminCategoryInternalList.css";

export default function AdminCategoryInternalList({
  categoriesAndInternal,
  setCurrentId,
  setOptionSubMenu,
  getCategoriesAndInternalAgain,
  setGetCategoriesAndInternalAgain,
  setShowModalDeleteInternal,
  setShowModalEditCategoryInternal,
}) {
  const { deleteCategoryInternal } = useInternal();

  const handleSectionAddInternal = (idCategoriaInterno) => {
    setCurrentId(idCategoriaInterno);
    setOptionSubMenu(2);
  };

  const handleEditInternal = (Producto) => {
    setCurrentId(Producto);
    setOptionSubMenu(3);
  };

  const handleDeleteInternal = async (Interno) => {
    setCurrentId(Interno.idInterno);
    setShowModalDeleteInternal(true);
  };

  const handleCategory = (category) => {
    setCurrentId(category);
    setShowModalEditCategoryInternal(true);
  };

  const handleDeleteCategory = async (idCategoriaInterno) => {
    try {
      const res = await deleteCategoryInternal(idCategoriaInterno);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setGetCategoriesAndInternalAgain(!getCategoriesAndInternalAgain);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <section className="AdminCategoryInternalList">
      {categoriesAndInternal?.length > 0 ? (
        categoriesAndInternal.map((category) => (
          <>
            <div className="AdminCategoryInternalList__Title">
              <span className="AdminCategoryInternalList__Title--Icon">
                <img
                  src={`${HOST_IMG}/Categorias.png`}
                  alt="Icono de la categoría"
                />
                <p>
                  {category.NombreCategoria} ({category.Interno?.length}{" "}
                  productos)
                </p>
              </span>
              <span className="AdminCategoryInternalList__Title--Buttons">
                <button
                  onClick={() => handleCategory(category)}
                  className="AdminCategoryInternalList__Title--Buttons--Button Edit"
                >
                  <ion-icon name="brush-outline"></ion-icon>
                </button>
                {/* SI NO HAY PRODUCTOS EN L A CATEGORIA, PODEMOS ELIMINARLA */}
                {category.Interno?.length === 0 && (
                  <button
                    onClick={() =>
                      handleDeleteCategory(category.idCategoriaInterno)
                    }
                    className="AdminCategoryInternalList__Title--Buttons--Button Delete"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                )}
              </span>
            </div>
            {category.Interno?.map((Interno, index) => (
              <div className="AdminCategoryInternalList__Details" key={index}>
                <span className="AdminCategoryInternalList__Details--Details">
                  <img
                    src={`${HOST_IMG}/${Interno.ImagenProducto}`}
                    alt={`Icono del ${Interno.NombreProducto}`}
                  />
                  <p>Nombre: {Interno.NombreProducto}</p>
                  <p>
                    Precio (Venta): ${Interno.PrecioProducto.toLocaleString()}
                  </p>
                  <p>Stock: {Interno.CantidadProducto}</p>
                </span>
                <span className="AdminCategoryInternalList__Details--Buttons">
                  <button onClick={() => handleEditInternal(Interno)}>
                    <ion-icon name="brush-outline"></ion-icon>
                  </button>
                  <button onClick={() => handleDeleteInternal(Interno)}>
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </span>
              </div>
            ))}
            <button
              className="AdminCategoryInternalList__Button"
              onClick={() =>
                handleSectionAddInternal(category.idCategoriaInterno)
              }
            >
              Agregar Producto Interno
            </button>
          </>
        ))
      ) : (
        <NotResults responsive>
          {" "}
          No hay productos internos disponibles
        </NotResults>
      )}
    </section>
  );
}
