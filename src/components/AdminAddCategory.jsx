/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProducts } from "../context/ProductsContext";

// IMPORTAMOS LAS AYUDAS
import { dataAddCategoryInputsProps } from "../helpers/InputsAddCategory";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminAddCategory.css";

export default function AdminAddCategory({
  setOptionSubMenu,
  getCategoriesAndProductsAgain,
  setGetCategoriesAndProductsAgain,
}) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const { addCategoryProduct, verifyCategoryProductExist } = useProducts();

  const checkCategoryExist = handleSubmit(async (dataCategory) => {
    try {
      const res = await verifyCategoryProductExist(dataCategory);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        createNewCategory(dataCategory);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const createNewCategory = async (dataCategory) => {
    try {
      const res = await addCategoryProduct(dataCategory);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      handleResetValues();
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const handleResetValues = () => {
    reset();
    setGetCategoriesAndProductsAgain(!getCategoriesAndProductsAgain);
    setOptionSubMenu(0);
  };

  return (
    <form onSubmit={checkCategoryExist} className="AddCategory">
      {dataAddCategoryInputsProps.map(
        ({ inputType, inputTitle, inputName, placeholder, validator }) => (
          <>
            <div className="AddCategory__ContainerInputs">
              <p className="AddCategory__ContainerInputs--Title">
                {inputTitle}
              </p>
              <input
                type={inputType}
                {...register(inputName, validator)}
                className="AddCategory__ContainerInputs--Input"
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
                    className="AddCategory__ContainerInputs--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <button type="submit" className="AddCategory__Button">
        Agregar Categoría
      </button>
    </form>
  );
}
