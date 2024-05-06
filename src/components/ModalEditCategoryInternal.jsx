/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInternal } from "../context/InternalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalEditCategoryInternal.css";

export default function ModalEditCategoryInternal({
  currentId,
  showModalEditCategoryInternal,
  setShowModalEditCategoryInternal,
  getCategoriesAndInternalAgain,
  setGetCategoriesAndInternalAgain,
}) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { updateCategoryInternal } = useInternal();

  const classModalEditCategoryInternal = showModalEditCategoryInternal
    ? "ModalEditCategoryInternal Show"
    : "ModalEditCategoryInternal";

  useEffect(() => {
    setValue("NombreCategoria", currentId?.NombreCategoria);
  }, []);

  const checkDataCategoryInternal = handleSubmit(
    async (dataCategoryInternal) => {
      dataCategoryInternal.idCategoriaInterno = currentId.idCategoriaInterno;
      try {
        const res = await updateCategoryInternal(dataCategoryInternal);
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
    }
  );

  const handleResetValues = () => {
    setGetCategoriesAndInternalAgain(!getCategoriesAndInternalAgain);
    setShowModalEditCategoryInternal(false);
    reset();
  };

  return (
    <main className={classModalEditCategoryInternal}>
      <div className="ModalEditCategoryInternal__Container">
        <button
          className="ModalEditCategoryInternal__Container__Close"
          onClick={() => setShowModalEditCategoryInternal(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalEditCategoryInternal__Container__Title">
          Actualizar categoría
        </p>
        <hr className="ModalEditCategoryInternal__Container__Divisor" />
        <form
          onSubmit={checkDataCategoryInternal}
          className="ModalEditCategoryInternal__Container__Form"
        >
          <p className="ModalEditCategoryInternal__Container__Form--Title">
            Nombre de la categoría
          </p>
          <input
            type="text"
            {...register("NombreCategoria", { required: true })}
            placeholder="Ingresa el nombre de la categoría"
            className="ModalEditCategoryInternal__Container__Form--Input"
          />
          {errors["NombreCategoria"] && (
            <small className="ModalEditCategoryInternal__Container__Form--SmallError">
              ¡Este campo es obligatorio! ⚠️
            </small>
          )}
          <button className="ModalEditCategoryInternal__Container__Form--Button">
            Actualizar
          </button>
        </form>
      </div>
    </main>
  );
}
