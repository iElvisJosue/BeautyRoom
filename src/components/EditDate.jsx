/* eslint-disable react/prop-types */

// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LAS AYUDAS
import { listOfServices } from "../helpers/ListServices";
import { listOfHours } from "../helpers/Hours";
import { dataUpdateDateInputsProps } from "../helpers/DataUpdateDate";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/EditDate.css";

export default function EditDate({
  setShowEditDate,
  currentDataDate,
  employees,
  searchingEmployees,
  setFilter,
  filter,
}) {
  const { updateOneDate } = useDates();

  const [fechaCita, setFechaCita] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(
    currentDataDate.ImagenCita
  );
  const [newEmployeeAssigned, setNewEmployeeAssigned] = useState(
    currentDataDate.EmpleadoAsignado
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  useEffect(() => {
    if (searchingEmployees || employees.length === 0) return;

    setFechaCita(currentDataDate.FechaCita);
    const foundEmployee = employees.find(
      ({ idUsuario }) => idUsuario === currentDataDate.EmpleadoAsignado
    );

    if (foundEmployee) {
      setValue("EmpleadoAsignado", foundEmployee.Usuario);
    } else {
      setValue("EmpleadoAsignado", "Sin asignar");
    }

    const { NombreCliente, TelefonoCliente, MotivoCita, HoraCita } =
      currentDataDate;
    setValue("NombreCliente", NombreCliente);
    setValue("TelefonoCliente", TelefonoCliente);
    setValue("MotivoCita", MotivoCita);
    setValue("HoraCita", HoraCita);
  }, [currentDataDate]);

  const handleSelectChange = (event) => {
    const index = event.target.selectedIndex;
    setSelectedIndex(index - 1);
  };
  const handleIdEmployeeAssigned = (event) => {
    const selectedOption = event.target.selectedOptions[0]; // Obtener el option seleccionado
    const selectedId = selectedOption.getAttribute("id"); // Obtener el ID del option seleccionado
    setNewEmployeeAssigned(selectedId); // Actualizar el estado con el ID del option seleccionado
  };

  const checkNewDataDate = handleSubmit(async (data) => {
    data.idCita = currentDataDate.idCita;
    data.FechaCita = fechaCita;
    data.EmpleadoAsignado = newEmployeeAssigned;
    data.ImagenCita = selectedIndex;
    try {
      const res = await updateOneDate(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        setFilter(!filter);
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setShowEditDate(false);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  return (
    <main className="EditDate">
      <div className="EditDate__Container">
        <span className="EditDate__Container__Back">
          <button
            className="EditDate__Container__Back--Button"
            onClick={() => setShowEditDate(false)}
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          Actualizar Cita
        </span>
        <form onSubmit={checkNewDataDate} className="EditDate__Container__Form">
          {dataUpdateDateInputsProps.map(
            (
              { inputTitle, inputType, inputName, placeholder, validator },
              index
            ) =>
              inputType === "text" && (
                <>
                  <span
                    className="EditDate__Container__Form--Inputs"
                    key={index}
                  >
                    <p className="EditDate__Container__Form--Inputs--Text">
                      {inputTitle}
                    </p>
                    <input
                      type={inputType}
                      {...register(inputName, validator)}
                      className="EditDate__Container__Form--Inputs--Input"
                      placeholder={placeholder}
                    />
                  </span>
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
          <span
            className="EditDate__Container__Form--Inputs"
            onChange={handleSelectChange}
          >
            <p className="EditDate__Container__Form--Inputs--Text">
              Motivo de la cita
            </p>
            <select
              {...register("MotivoCita")}
              className="EditDate__Container__Form--Inputs--Input"
            >
              {listOfServices}
            </select>
          </span>
          <span className="EditDate__Container__Form--Inputs">
            <p className="EditDate__Container__Form--Inputs--Text">
              Fecha de la cita
            </p>
            <input
              {...register("FechaCita")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={fechaCita}
              onChange={(e) => setFechaCita(e.target.value)}
              className="EditDate__Container__Form--Inputs--Input"
            />
          </span>
          <span className="EditDate__Container__Form--Inputs">
            <p className="EditDate__Container__Form--Inputs--Text">
              Hora de la cita
            </p>
            <select
              {...register("HoraCita")}
              className="EditDate__Container__Form--Inputs--Input"
            >
              {listOfHours}
            </select>
          </span>
          <span className="EditDate__Container__Form--Inputs">
            <p className="EditDate__Container__Form--Inputs--Text">
              Empleado asignado
            </p>
            <select
              {...register("EmpleadoAsignado")}
              className="EditDate__Container__Form--Inputs--Input"
              onChange={handleIdEmployeeAssigned}
            >
              <option value="Sin asignar" id="0" defaultValue={true} hidden>
                Sin asignar
              </option>
              {employees.length > 0 &&
                employees.map(({ Usuario, idUsuario }, index) => (
                  <option key={index} value={Usuario} id={idUsuario}>
                    {Usuario}
                  </option>
                ))}
            </select>
          </span>
          <button className="EditDate__Container__Form--Button">
            Actualizar
          </button>
        </form>
        <small className="EditDate__Container__Message">
          ¡Atención! Antes de actualizar la cita, el sistema verificara si la
          fecha y hora están disponibles, esto con la finalidad de evitar una
          cita duplicada.
        </small>
      </div>
    </main>
  );
}
