/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInternal } from "../context/InternalContext";

// IMPORTAMOS LAS AYUDAS
import { dataAddCategoryInternalInputsProps } from "../helpers/InputsAddCategoryInternal";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminAddCategoryInternal.css";

export default function AdminAddCategoryInternal({
  setOptionSubMenu,
  getCategoriesAndInternalAgain,
  setGetCategoriesAndInternalAgain,
}) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const { addCategoryInternal } = useInternal();

  const createNewCategory = handleSubmit(async (dataCategory) => {
    try {
      const res = await addCategoryInternal(dataCategory);
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
    reset();
    setGetCategoriesAndInternalAgain(!getCategoriesAndInternalAgain);
    setOptionSubMenu(0);
  };

  return (
    <form onSubmit={createNewCategory} className="AdminAddCategoryInternal">
      {dataAddCategoryInternalInputsProps.map(
        ({ inputType, inputTitle, inputName, placeholder, validator }) => (
          <>
            <div className="AdminAddCategoryInternal__ContainerInputs">
              <p className="AdminAddCategoryInternal__ContainerInputs--Title">
                {inputTitle}
              </p>
              <input
                type={inputType}
                {...register(inputName, validator)}
                className="AdminAddCategoryInternal__ContainerInputs--Input"
                placeholder={placeholder}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name={inputName}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <small
                    key={type}
                    className="AdminAddCategoryInternal__ContainerInputs--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <button type="submit" className="AdminAddCategoryInternal__Button">
        Agregar Categoría Interna
      </button>
    </form>
  );
}
