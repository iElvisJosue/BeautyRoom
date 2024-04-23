/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LAS AYUDAS
import { listOfServices } from "../helpers/ListServices";
import { dataClientInputsProps } from "../helpers/DataClient";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LOS ESTILOS
import "../styles/DataClient.css";

export default function DataClient({
  dayDate,
  setProgressDate,
  setShowModalPay,
  monthNumber,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const { createDate } = useDates();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { dayName, day, monthDay, year, hour, time } = dayDate;

  const handleSelectChange = (event) => {
    const index = event.target.selectedIndex;
    setSelectedIndex(index);
  };

  const validateDataClient = handleSubmit(async (data) => {
    if (selectedIndex === "Selecciona un servicio") {
      return toast.error("¡Por favor selecciona un servicio! ❌");
    } else {
      formatDataClient(data);
      return setShowModalPay(true);
    }
  });

  const formatDataClient = (data) => {
    const dateFormatted = `${year}-${
      monthNumber < 10 ? `0${monthNumber}` : monthNumber
    }-${day}`;
    const hourFormatted = `${hour}:00 ${time}`;
    data.FechaCita = dateFormatted;
    data.HoraCita = hourFormatted;
    data.ImagenCita = selectedIndex - 1;
    console.log(data);

    createNewDate(data);
  };

  const createNewDate = async (data) => {
    try {
      const res = await createDate(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        return toast.success("¡Datos guardados! ✔️");
      }
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <div className="DataClient__Container">
      <aside className="DataClient__Container__DateInformation">
        <p className="DataClient__Container__DateInformation__Title">
          Datos de la cita <br /> programada
        </p>
        <div className="DataClient__Container__DateInformation__Details">
          <span className="DataClient__Container__DateInformation__Details--Day">
            <img src="IconoCalendario.png" alt="Icono del calendario" />
            <p>
              {`${dayName} ${day}`}
              <br />
              {`de ${monthDay} del ${year}`}
            </p>
          </span>
          <span className="DataClient__Container__DateInformation__Details--Hour">
            <img src="IconoReloj.png" alt="Icono del horario" />
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
          onSubmit={validateDataClient}
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
                  <div
                    className="DataClient__Container__Form--Data--Inputs"
                    onChange={handleSelectChange}
                  >
                    <p className="DataClient__Container__Form--Data--Inputs--Title">
                      Motivo de la Cita
                    </p>
                    <select
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
