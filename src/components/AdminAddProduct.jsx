/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProducts } from "../context/ProductsContext";

// IMPORTAMOS LAS AYUDAS
import { dataAddProductInputsProps } from "../helpers/InputsAddProduct";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminAddProduct.css";

export default function AdminAddProduct({
  categoriesAndProducts,
  currentId,
  setOptionSubMenu,
  getCategoriesAndProductsAgain,
  setGetCategoriesAndProductsAgain,
}) {
  const [image, setImage] = useState("SeleccionarImagen.png");
  const [hasImage, setHasImage] = useState(null);
  const [showError, setShowError] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  //   OBTENEMOS EL NOMBRE DE LA CATEGORÍA
  const nameCategory = categoriesAndProducts.find(
    ({ idCategoriaProducto }) => idCategoriaProducto === currentId
  );

  const { addImageProduct, addProduct } = useProducts();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ESTABLECEMOS LA IMAGEN SELECCIONADA EN EL INPUT FILE
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setHasImage(file);
      setShowError(false);
    }
  };
  const validateImage = handleSubmit(async (data) => {
    if (hasImage) {
      if (!hasImage.type.startsWith("image")) {
        handleResponseMessages({
          status: 404,
          data: "El archivo seleccionado no es una imagen, por favor, selecciona una imagen.",
        });
        return;
      }
      if (hasImage.size > 1000000) {
        handleResponseMessages({
          status: 404,
          data: "La imagen sobrepasa el tamaño máximo, por favor, selecciona una imagen diferente o comprime la imagen.",
        });
        return;
      }
      addImage(data);
    } else {
      setShowError(true);
    }
  });
  const addImage = async (dataProduct) => {
    dataProduct.ImagenProducto = hasImage.name;
    dataProduct.idCategoriaProducto = currentId;

    // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
    const formData = new FormData();
    formData.append("TituloImagen", "Producto");
    formData.append("Imagen", hasImage);
    try {
      const res = await addImageProduct(formData);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        try {
          const res = await addProduct(dataProduct);
          const { status, data } = res;
          handleResponseMessages({ status, data });
          setGetCategoriesAndProductsAgain(!getCategoriesAndProductsAgain);
          setOptionSubMenu(0);
        } catch (error) {
          const { status, data } = error.response;
          handleResponseMessages({ status, data });
        }
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <form
      onSubmit={validateImage}
      className="AdminAddProduct"
      encType="multipart/form-data"
    >
      <p className="AdminAddProduct__Title">
        Agregando producto a {nameCategory.NombreCategoria}
      </p>
      <picture className="AdminAddProduct__Picture">
        <img src={image} alt="Agregar Imagen del Servicio" />
      </picture>
      <p className="AdminAddProduct__Description">
        Por favor, selecciona una imagen en formato PNG, JPG o JPEG con un
        tamaño máximo de 2MB.
      </p>
      <label className="AdminAddProduct__File">
        <input
          type="file"
          accept="image/*"
          name="Imagen"
          onChange={handleFileChange}
        />
        {hasImage ? hasImage?.name : "Seleccionar Imagen"}
      </label>
      {showError && (
        <span className="AdminAddProduct__File--SmallError">
          ¡Por favor, selecciona una imagen! ⚠️
        </span>
      )}
      {dataAddProductInputsProps.map(
        ({ inputType, inputTitle, inputName, placeholder, validator }) => (
          <>
            {inputType === "text" ? (
              <div className="AdminAddProduct__ContainerInputs">
                <p className="AdminAddProduct__ContainerInputs--Title">
                  {inputTitle}
                </p>
                <input
                  type="text"
                  {...register(inputName, validator)}
                  className="AdminAddProduct__ContainerInputs--Input"
                  placeholder={placeholder}
                />
              </div>
            ) : (
              <div className="AdminAddProduct__ContainerInputs">
                <p className="AdminAddProduct__ContainerInputs--Title">
                  {inputTitle}
                </p>
                <textarea
                  {...register(inputName, validator)}
                  className="AdminAddProduct__ContainerInputs--Input TextArea"
                  placeholder={placeholder}
                ></textarea>
              </div>
            )}
            <ErrorMessage
              errors={errors}
              name={inputName}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <small
                    key={type}
                    className="AdminAddProduct__ContainerInputs--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <button type="submit" className="AddUsers__Button">
        Agregar Producto
      </button>
    </form>
  );
}
