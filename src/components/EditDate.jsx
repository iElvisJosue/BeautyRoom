/* eslint-disable react/prop-types */

// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LOS HOOKS A USAR
import useGetSubservicesByName from "../hooks/useGetSubservicesByName";

// IMPORTAMOS LAS AYUDAS
// import { listOfServices } from "../helpers/ListServices";
// import { listOfHours } from "../helpers/Hours";
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
  services,
  hours,
  searchingHours,
}) {
  const { subservicesByName, setCurrentNameService } = useGetSubservicesByName({
    NombreServicio: currentDataDate.MotivoCita,
  });
  const { updateOneDate } = useDates();
  const [fechaCita, setFechaCita] = useState("");
  const [dateReason, setDateReason] = useState(currentDataDate.ImagenCita);
  // const [selectedIndex, setSelectedIndex] = useState(
  //   currentDataDate.ImagenCita
  // );
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
    // if (searchingEmployees || employees.length === 0) return;
    if (searchingEmployees || searchingHours) return;

    setFechaCita(currentDataDate.FechaCita);
    const foundEmployee = employees.find(
      ({ idUsuario }) => idUsuario === currentDataDate.EmpleadoAsignado
    );

    if (foundEmployee) {
      setValue("EmpleadoAsignado", foundEmployee.Usuario);
    } else {
      setValue("EmpleadoAsignado", "Sin asignar");
    }

    const {
      NombreCliente,
      TelefonoCliente,
      MotivoCita,
      SubmotivoCita,
      HoraCita,
    } = currentDataDate;
    setValue("NombreCliente", NombreCliente);
    setValue("TelefonoCliente", TelefonoCliente);
    setValue("MotivoCita", MotivoCita);
    setValue("SubmotivoCita", SubmotivoCita);
    setValue("HoraCita", HoraCita);
  }, [currentDataDate]);

  const handleChangeDateReason = (event) => {
    const selectedDateReason =
      event.target.selectedOptions[0].getAttribute("id");
    setDateReason(selectedDateReason);
    const NombreServicio = selectedDateReason.split(".")[0];
    setCurrentNameService(NombreServicio);
  };
  const handleIdEmployeeAssigned = (event) => {
    const selectedEmployee = event.target.selectedOptions[0].getAttribute("id"); // Obtener el option seleccionado
    setNewEmployeeAssigned(selectedEmployee); // Actualizar el estado con el ID del option seleccionado
  };
  const checkNewDataDate = handleSubmit(async (data) => {
    data.idCita = currentDataDate.idCita;
    data.FechaCita = fechaCita;
    data.EmpleadoAsignado = newEmployeeAssigned;
    data.ImagenCita = dateReason;
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
  const back = () => {
    setFilter(!filter);
    setShowEditDate(false);
  };
  // const handleSelectChange = (event) => {
  //   const index = event.target.selectedIndex;
  //   setSelectedIndex(index - 1);
  // };
  // const handleIdEmployeeAssigned = (event) => {
  //   const selectedEmployee = event.target.selectedOptions[0].getAttribute("id"); // Obtener el option seleccionado
  //   const selectedId = selectedOption.getAttribute("id"); // Obtener el ID del option seleccionado
  //   setNewEmployeeAssigned(selectedId); // Actualizar el estado con el ID del option seleccionado
  // };

  return (
    <main className="EditDate">
      <div className="EditDate__Container">
        <span className="EditDate__Container__Back">
          <button className="EditDate__Container__Back--Button" onClick={back}>
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
            onChange={handleChangeDateReason}
          >
            <p className="EditDate__Container__Form--Inputs--Text">
              Servicio de la cita
            </p>
            <select
              {...register("MotivoCita")}
              className="EditDate__Container__Form--Inputs--Input"
            >
              {services.map(
                ({ NombreServicio, ImagenServicio, idServicio }) => (
                  <option
                    key={idServicio}
                    value={NombreServicio}
                    id={ImagenServicio}
                  >
                    {NombreServicio}
                  </option>
                )
              )}
              {/* {listOfServices} */}
            </select>
          </span>
          {subservicesByName && (
            <span className="EditDate__Container__Form--Inputs">
              <p className="EditDate__Container__Form--Inputs--Text">
                Subservicio de la cita
              </p>
              <select
                {...register("SubmotivoCita")}
                className="EditDate__Container__Form--Inputs--Input"
              >
                {subservicesByName.map(
                  ({ NombreSubservicio, idSubservicio }) => (
                    <option
                      key={idSubservicio}
                      value={NombreSubservicio}
                      id={idSubservicio}
                    >
                      {NombreSubservicio}
                    </option>
                  )
                )}
              </select>
            </span>
          )}
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
              {hours.map(({ HoraServicio, idHora }) => (
                <option key={idHora} value={HoraServicio}>
                  {HoraServicio}
                </option>
              ))}
              {/* {listOfHours} */}
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
