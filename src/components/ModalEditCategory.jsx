/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProducts } from "../context/ProductsContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalEditCategory.css";

export default function ModalEditCategory({
  currentId,
  showModalEditCategory,
  setShowModalEditCategory,
  getCategoriesAndProductsAgain,
  setGetCategoriesAndProductsAgain,
}) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { updateCategory } = useProducts();

  const classModalEditCategory = showModalEditCategory
    ? "ModalEditCategory Show"
    : "ModalEditCategory";

  useEffect(() => {
    setValue("NombreCategoria", currentId?.NombreCategoria);
  }, []);

  const checkDataCategory = handleSubmit(async (dataCategory) => {
    dataCategory.idCategoriaProducto = currentId.idCategoriaProducto;
    try {
      const res = await updateCategory(dataCategory);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        handleResetValues();
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const handleResetValues = () => {
    setGetCategoriesAndProductsAgain(!getCategoriesAndProductsAgain);
    setShowModalEditCategory(false);
    reset();
  };

  return (
    <main className={classModalEditCategory}>
      <div className="ModalEditCategory__Container">
        <button
          className="ModalEditCategory__Container__Close"
          onClick={() => setShowModalEditCategory(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalEditCategory__Container__Title">
          Actualizar categoría
        </p>
        <hr className="ModalEditCategory__Container__Divisor" />
        <form
          onSubmit={checkDataCategory}
          className="ModalEditCategory__Container__Form"
        >
          <p className="ModalEditCategory__Container__Form--Title">
            Nombre de la categoría
          </p>
          <input
            type="text"
            {...register("NombreCategoria", { required: true })}
            placeholder="Ingresa el nombre de la categoría"
            className="ModalEditCategory__Container__Form--Input"
          />
          {errors["NombreCategoria"] && (
            <small className="ModalEditCategory__Container__Form--SmallError">
              ¡Este campo es obligatorio! ⚠️
            </small>
          )}
          <button className="ModalEditCategory__Container__Form--Button">
            Actualizar
          </button>
        </form>
      </div>
    </main>
  );
}
