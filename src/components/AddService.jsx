/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { dataAddServiceInputsProps } from "../helpers/InputsAddService";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AddService.css";

export default function AddService({
  setOptionSubMenu,
  setGetServicesAndSubservicesAgain,
  getServicesAndSubservicesAgain,
}) {
  const [hasImage, setHasImage] = useState(null);
  const [showError, setShowError] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const { addImageService, addService } = useServices();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
  const addImage = async (dataService) => {
    dataService.ImagenServicio = hasImage.name;
    const formData = new FormData();
    formData.append("ImagenServicio", hasImage);
    try {
      const res = await addImageService(formData);
      if (res.status === 200) {
        try {
          const res = await addService(dataService);
          const { status, data } = res;
          handleResponseMessages({ status, data });
          setGetServicesAndSubservicesAgain(!getServicesAndSubservicesAgain);
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
      className="AddService"
      encType="multipart/form-data"
    >
      <picture className="AddService__Picture">
        <img src="./SeleccionarImagen.png" alt="Agregar Imagen del Servicio" />
      </picture>
      <p className="AddService__Description">
        Por favor, selecciona una imagen en formato PNG, JPG o JPEG con un
        tamaño máximo de 2MB.
      </p>
      <label className="AddService__File">
        <input
          type="file"
          accept="image/*"
          name="ImagenServicio"
          onChange={handleFileChange}
        />
        {hasImage ? hasImage?.name : "Seleccionar Imagen"}
      </label>
      {showError && (
        <span className="AddService__File--SmallError">
          ¡Por favor, selecciona una imagen! ⚠️
        </span>
      )}
      {dataAddServiceInputsProps.map(
        ({ inputType, inputTitle, inputName, placeholder, validator }) => (
          <>
            {inputType !== "select" ? (
              <div className="AddService__ContainerInputs">
                <p className="AddService__ContainerInputs--Title">
                  {inputTitle}
                </p>
                <input
                  type="text"
                  {...register(inputName, validator)}
                  className="AddService__ContainerInputs--Input"
                  placeholder={placeholder}
                />
              </div>
            ) : (
              <div className="AddService__ContainerInputs">
                <p className="AddService__ContainerInputs--Title">
                  {inputTitle}
                </p>
                <select
                  {...register(inputName, validator)}
                  className="AddUsers__Container__Form--Data--Input"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
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
                    className="AddService__ContainerInputs--SmallError"
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
        Agregar Servicio
      </button>
    </form>
  );
}