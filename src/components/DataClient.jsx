/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS ESTILOS
import "../styles/DataClient.css";

// IMPORTAMOS LAS AYUDAS
import { listOfServices } from "../helpers/ListServices";
import { dataClientInputsProps } from "../helpers/DataClient";

export default function DataClient({
  dayDate,
  setProgressDate,
  setShowModalPay,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const { dayName, day, monthDay, year, hour, time } = dayDate;

  const checkDataClient = handleSubmit(async (data) => {
    data.dateService === "Selecciona un servicio"
      ? toast.error("¡Por favor selecciona un servicio! ❌")
      : (toast.success("¡Cita programada correctamente! 🎉"),
        setShowModalPay(true));
  });

  return (
    <div className="DataClient__Container">
      <aside className="DataClient__Container__DateInformation">
        <p className="DataClient__Container__DateInformation__Title">
          Datos de la cita <br /> programada
        </p>
        <div className="DataClient__Container__DateInformation__Details">
          <span className="DataClient__Container__DateInformation__Details--Day">
            <img
              src="../../public/IconoCalendario.png"
              alt="Icono del calendario"
            />
            <p>
              {`${dayName} ${day}`}
              <br />
              {`de ${monthDay} del ${year}`}
            </p>
          </span>
          <span className="DataClient__Container__DateInformation__Details--Hour">
            <img src="../../public/IconoReloj.png" alt="Icono del horario" />
            <p>{`${hour}:00 ${time}`}</p>
          </span>
        </div>
        <button
          className="DataClient__Container__DateInformation__Button"
          onClick={() => setProgressDate(0)}
        >
          Editar
        </button>
      </aside>
      <aside className="DataClient__Container__Form">
        <p className="DataClient__Container__Form__Title">Completa tus datos</p>
        <form
          onSubmit={checkDataClient}
          className="DataClient__Container__Form--Data"
        >
          {dataClientInputsProps.map(
            ({ inputType, inputTitle, inputName, placeholder, validator }) => (
              <>
                {inputType === "text" ? (
                  <div className="DataClient__Container__Form--Data--Inputs">
                    <p className="DataClient__Container__Form--Data--Inputs--Title">
                      {inputTitle}
                    </p>
                    <input
                      type="text"
                      {...register(inputName, validator)}
                      className="DataClient__Container__Form--Data--Inputs--Input"
                      placeholder={placeholder}
                    />
                  </div>
                ) : (
                  <div className="DataClient__Container__Form--Data--Inputs">
                    <p className="DataClient__Container__Form--Data--Inputs--Title">
                      Motivo de la Cita
                    </p>
                    <select
                      type="text"
                      {...register(inputName, validator)}
                      className="DataClient__Container__Form--Data--Inputs--Input"
                    >
                      {listOfServices}
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
          <button className="DataClient__Container__Form--Button">Pagar</button>
        </form>
      </aside>
    </div>
  );
}
