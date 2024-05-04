/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";
import { inputsModalAdminService } from "../helpers/InputsModalAdminService";
import { HOST_IMG } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalAdminService.css";

export default function ModalAdminService({
  services,
  currentId,
  showModalAdminService,
  setShowModalAdminService,
  getServicesAndSubservicesAgain,
  setGetServicesAndSubservicesAgain,
}) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(null);
  const [imgFromServer, setImgFromServer] = useState(true);

  useEffect(() => {
    const serviceToUpdate = services.find(
      ({ idServicio }) => idServicio === currentId
    );
    setValue("NombreServicio", serviceToUpdate?.NombreServicio);
    setValue("EstadoServicio", serviceToUpdate?.EstadoServicio);
    setImage(serviceToUpdate?.ImagenServicio);
  }, [showModalAdminService]);

  const { addImageService, updateService } = useServices();

  const classModalAddSubservice = showModalAdminService
    ? "ModalAdminService Show"
    : "ModalAdminService";

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
      setImgFromServer(false);
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
    }
    handleUpdateServiceImage(data);
  });

  const handleUpdateServiceImage = async (dataService) => {
    dataService.ImagenServicio = hasImage ? hasImage.name : image;
    dataService.idServicio = currentId;
    if (hasImage) {
      const formData = new FormData();
      formData.append("Imagen", hasImage);
      try {
        const res = await addImageService(formData);
        console.log(res);
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          handleUpdateService(dataService);
        }
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    } else {
      handleUpdateService(dataService);
    }
  };

  const handleUpdateService = async (dataService) => {
    try {
      const res = await updateService(dataService);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setGetServicesAndSubservicesAgain(!getServicesAndSubservicesAgain);
      handleResetValues();
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const handleResetValues = () => {
    setHasImage(null);
    setImgFromServer(true);
    setShowModalAdminService(false);
    reset();
  };

  return (
    <main className={classModalAddSubservice}>
      <div className="ModalAdminService__Container">
        <button
          className="ModalAdminService__Container__Close"
          onClick={handleResetValues}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalAdminService__Container__Title">
          Actualizar Servicio
        </p>
        <hr className="ModalAdminService__Container__Divisor" />
        <form
          className="ModalAdminService__Container__Form"
          onSubmit={validateImage}
        >
          <picture className="ModalAdminService__Container__Form--Picture">
            <img
              src={imgFromServer ? `${HOST_IMG}/${image} ` : image}
              alt="Agregar Imagen del Servicio"
            />
          </picture>
          <p className="ModalAdminService__Container__Form--Description">
            Por favor, selecciona una imagen en formato PNG, JPG o JPEG con un
            tamaño máximo de 2MB.
          </p>
          <label className="ModalAdminService__Container__Form--File">
            <input
              type="file"
              accept="image/*"
              name="Imagen"
              onChange={handleFileChange}
            />
            {hasImage ? hasImage?.name : "Seleccionar Imagen"}
          </label>
          {inputsModalAdminService.map(
            ({ inputTitle, inputType, inputName, placeholder, validator }) => (
              <>
                {inputType === "text" ? (
                  <>
                    <p className="ModalAdminService__Container__Form--Title">
                      {inputTitle}
                    </p>
                    <input
                      type={inputType}
                      {...register(inputName, validator)}
                      className="ModalAdminService__Container__Form--Input"
                      placeholder={placeholder}
                    />
                    <ErrorMessage
                      errors={errors}
                      name={inputName}
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <small
                            key={type}
                            className="DataClient__Container__Form--Data--SmallError"
                          >
                            {message}
                          </small>
                        ))
                      }
                    />
                  </>
                ) : (
                  <>
                    <p className="ModalAdminService__Container__Form--Title">
                      Estado Servicio
                    </p>
                    <select
                      {...register("EstadoServicio")}
                      className="ModalAdminService__Container__Form--Input"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </>
                )}
              </>
            )
          )}
          <button className="ModalAdminService__Container__Form--Button">
            Actualizar
          </button>
        </form>
      </div>
    </main>
  );
}
