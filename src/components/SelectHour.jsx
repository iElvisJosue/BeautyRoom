/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES
import HourDetails from "./HourDetails";
import Employees from "../components/Employees";
import NotResults from "./NotResults";

// IMPORTAMOS LOS HOOKS A USAR
import useGetHours from "../hooks/useGetHours";
import useGetEmployeesByService from "../hooks/useGetEmployeesByService";
import useGetHoursByEmployeeSelected from "../hooks/useGetHoursByEmployeeSelected";

// IMPORTAMOS LAS AYUDAS
// import { hours } from "../helpers/Hours";
import { DateFormatted } from "../helpers/DateFormatted";

// IMPORTAMOS LOS ESTILOS
import "../styles/SelectHour.css";

export default function SelectHour({
  dateInformation,
  setDateInformation,
  setProgressDate,
  monthNumber,
}) {
  const [numberEmployee, setNumberEmployee] = useState(0);
  const { NombreServicio, DíaCita, AñoCita } = dateInformation;
  const dateFormatted = DateFormatted(AñoCita, monthNumber, DíaCita);
  const { hours } = useGetHours();
  const { employeesByService } = useGetEmployeesByService({
    NombreServicio,
  });
  const { hoursByEmployeeSelected, setInformationDate } =
    useGetHoursByEmployeeSelected();

  useEffect(() => {
    if (employeesByService.length > 0) {
      dateInformation.EmpleadoAsignado = employeesByService[0].Usuario;
      setInformationDate({
        // EmpleadoAsignado: employeesByService && employeesByService[0].Usuario,
        EmpleadoAsignado: employeesByService[0].Usuario,
        FechaCita: dateFormatted,
      });
    }
  }, [employeesByService]);

  // if (searchingHours || searchingEmployeesByService) return <Loader />;

  // const getNewHoursByEmployee = () => {
  //   dateInformation.EmpleadoAsignado = employeesByService[0].Usuario;
  //   setInformationDate({
  //     EmpleadoAsignado: employeesByService && employeesByService[0].Usuario,
  //     FechaCita: dateFormatted,
  //   });
  // };

  return (
    // <div className="SelectHour__Container" onLoad={getNewHoursByEmployee}>
    <div className="SelectHour__Container">
      {employeesByService.length === 0 ? (
        <NotResults>
          {" "}
          No hay empleados disponibles para este servicio.{" "}
        </NotResults>
      ) : employeesByService && hoursByEmployeeSelected ? (
        <>
          <p className="SelectHour__Title">Selecciona una hora</p>
          <p className="SelectHour__Subtitle">
            {employeesByService.length > 0
              ? `Actualmente estas viendo el horario del ${employeesByService[
                  numberEmployee
                ].Usuario.toUpperCase()}, en caso de no ver la hora que deseas, prueba seleccionando otro empleado.`
              : `No hay empleados disponibles para este servicio. Por favor selecciona otro tipo de servicio.`}
          </p>
          <div className="SelectHour__Container--Employees">
            {employeesByService.map(({ Usuario }, index) => (
              <Employees
                key={index}
                dateInformation={dateInformation}
                Usuario={Usuario}
                setInformationDate={setInformationDate}
                dateFormatted={dateFormatted}
                setNumberEmployee={setNumberEmployee}
                numberEmployee={numberEmployee}
                index={index}
              />
            ))}
          </div>
          <div className="SelectHour__Calendar">
            {hours.map(({ HoraServicio }, index) => {
              const hourExist = hoursByEmployeeSelected.includes(HoraServicio);
              if (!hourExist) {
                return (
                  <HourDetails
                    key={index}
                    HoraServicio={HoraServicio}
                    setProgressDate={setProgressDate}
                    dateInformation={dateInformation}
                    setDateInformation={setDateInformation}
                  />
                );
              }
            })}
          </div>
          <button className="Date__Back" onClick={() => setProgressDate(2)}>
            <ion-icon name="chevron-back-outline"></ion-icon> Regresar
          </button>
        </>
      ) : (
        <>
          <NotResults>
            Ocurrió un error inesperado al consultar el horario.
          </NotResults>
          <button
            className="Date__Reload"
            onClick={() => window.location.reload()}
          >
            <ion-icon name="refresh-outline"></ion-icon> Volver a intentar
          </button>
        </>
      )}
    </div>
  );
}
