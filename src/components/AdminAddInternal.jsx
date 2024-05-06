/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInternal } from "../context/InternalContext";

// IMPORTAMOS LAS AYUDAS
import { dataAddInternalInputsProps } from "../helpers/InputsAddInternal";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminAddInternal.css";

export default function AdminAddInternal({
  categoriesAndInternal,
  currentId,
  setOptionSubMenu,
  getCategoriesAndInternalAgain,
  setGetCategoriesAndInternalAgain,
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
  const nameCategory = categoriesAndInternal.find(
    ({ idCategoriaInterno }) => idCategoriaInterno === currentId
  );

  const { addImageInternal, addInternal } = useInternal();
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
  const addImage = async (dataInternal) => {
    dataInternal.ImagenProducto = hasImage.name;
    dataInternal.idCategoriaInterno = currentId;

    // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
    const formData = new FormData();
    formData.append("TituloImagen", "Interno");
    formData.append("Imagen", hasImage);
    try {
      const res = await addImageInternal(formData);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        try {
          const res = await addInternal(dataInternal);
          const { status, data } = res;
          handleResponseMessages({ status, data });
          setGetCategoriesAndInternalAgain(!getCategoriesAndInternalAgain);
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
      className="AdminAddInternal"
      encType="multipart/form-data"
    >
      <p className="AdminAddInternal__Title">
        Agregando producto interno a{" "}
        {nameCategory.NombreCategoria.toLocaleUpperCase()}
      </p>
      <picture className="AdminAddInternal__Picture">
        <img src={image} alt="Agregar Imagen del Servicio" />
      </picture>
      <p className="AdminAddInternal__Description">
        Por favor, selecciona una imagen en formato PNG, JPG o JPEG con un
        tamaño máximo de 2MB.
      </p>
      <label className="AdminAddInternal__File">
        <input
          type="file"
          accept="image/*"
          name="Imagen"
          onChange={handleFileChange}
        />
        {hasImage ? hasImage?.name : "Seleccionar Imagen"}
      </label>
      {showError && (
        <span className="AdminAddInternal__File--SmallError">
          ¡Por favor, selecciona una imagen! ⚠️
        </span>
      )}
      {dataAddInternalInputsProps.map(
        ({ inputType, inputTitle, inputName, placeholder, validator }) => (
          <>
            {inputType === "text" ? (
              <div className="AdminAddInternal__ContainerInputs">
                <p className="AdminAddInternal__ContainerInputs--Title">
                  {inputTitle}
                </p>
                <input
                  type="text"
                  {...register(inputName, validator)}
                  className="AdminAddInternal__ContainerInputs--Input"
                  placeholder={placeholder}
                />
              </div>
            ) : (
              <div className="AdminAddInternal__ContainerInputs">
                <p className="AdminAddInternal__ContainerInputs--Title">
                  {inputTitle}
                </p>
                <textarea
                  {...register(inputName, validator)}
                  className="AdminAddInternal__ContainerInputs--Input TextArea"
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
                    className="AdminAddInternal__ContainerInputs--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <button type="submit" className="AdminAddInternal__Button">
        Agregar Producto Interno
      </button>
    </form>
  );
}
