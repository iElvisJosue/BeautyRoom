/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";
import { inputsModalAdminSubservice } from "../helpers/InputsModalAdminSubservice";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalAdminSubservice.css";

export default function ModalAdminSubservice({
  services,
  currentId,
  goingToUpdate,
  setGoingToUpdate,
  showModalAdminSubservice,
  setShowModalAdminSubservice,
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

  if (goingToUpdate) {
    const idSubservicios = services.map(({ Subservicios }) =>
      Subservicios.map((idSubservicio) => idSubservicio)
    );
    const idSubserviciosFlat = idSubservicios.flat(Infinity);
    const getDataSubservice = idSubserviciosFlat.find(
      (Subservicio) => Subservicio.idSubservicio === currentId
    );
    setValue("NombreSubservicio", getDataSubservice.NombreSubservicio);
    setValue("CostoSubservicio", getDataSubservice.CostoSubservicio);
  }

  const { addSubservice, updateSubservice } = useServices();

  const classModalAddSubservice = showModalAdminSubservice
    ? "ModalAdminSubservice Show"
    : "ModalAdminSubservice";

  const handleAddSubservice = handleSubmit(async (dataSubservice) => {
    dataSubservice.idServicio = currentId;
    try {
      const res = await addSubservice(dataSubservice);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setShowModalAdminSubservice(false);
      setGetServicesAndSubservicesAgain(!getServicesAndSubservicesAgain);
      reset();
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const handleUpdateSubservice = handleSubmit(async (dataSubservice) => {
    dataSubservice.idSubservicio = currentId;
    try {
      const res = await updateSubservice(dataSubservice);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setShowModalAdminSubservice(false);
      setGetServicesAndSubservicesAgain(!getServicesAndSubservicesAgain);
      setGoingToUpdate(false);
      reset();
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const handleCancelAddSubservice = () => {
    setShowModalAdminSubservice(false);
    setGoingToUpdate(false);
    reset();
  };

  return (
    <main className={classModalAddSubservice}>
      <div className="ModalAdminSubservice__Container">
        <button
          className="ModalAdminSubservice__Container__Close"
          onClick={handleCancelAddSubservice}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalAdminSubservice__Container__Title">
          {goingToUpdate ? "Actualizar Subservicio" : "Agregar Subservicio"}
        </p>
        <hr className="ModalAdminSubservice__Container__Divisor" />
        <form
          className="ModalAdminSubservice__Container__Form"
          onSubmit={
            goingToUpdate ? handleUpdateSubservice : handleAddSubservice
          }
        >
          {inputsModalAdminSubservice.map(
            ({ inputTitle, inputType, inputName, placeholder, validator }) => (
              <>
                <p className="ModalAdminSubservice__Container__Form--Title">
                  {inputTitle}
                </p>
                <input
                  type={inputType}
                  {...register(inputName, validator)}
                  className="ModalAdminSubservice__Container__Form--Input"
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
            )
          )}
          <button className="ModalAdminSubservice__Container__Form--Button">
            {goingToUpdate ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>
    </main>
  );
}
