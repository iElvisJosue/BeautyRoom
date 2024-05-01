/* eslint-disable react/prop-types */
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES
import HourDetails from "./HourDetails";
import Loader from "../components/Loader";
import Employees from "../components/Employees";

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
  const [numberEmployee, setNumberEmployee] = useState(1);
  const { NombreServicio, DíaCita, AñoCita } = dateInformation;
  const dateFormatted = DateFormatted(AñoCita, monthNumber, DíaCita);
  const { hours, searchingHours } = useGetHours();
  const { employeesByService, searchingEmployeesByService } =
    useGetEmployeesByService({
      NombreServicio,
    });
  const { hoursByEmployeeSelected, setInformationDate } =
    useGetHoursByEmployeeSelected();

  if (searchingHours || searchingEmployeesByService) return <Loader />;

  const getNewHoursByEmployee = () => {
    dateInformation.EmpleadoAsignado = employeesByService[0].idUsuario;
    setInformationDate({
      EmpleadoAsignado: employeesByService && employeesByService[0].idUsuario,
      FechaCita: dateFormatted,
    });
  };

  return (
    <div className="SelectHour__Container" onLoad={getNewHoursByEmployee}>
      <p className="SelectHour__Title">Selecciona una hora</p>
      <p className="SelectHour__Subtitle">
        {employeesByService.length > 1
          ? `Actualmente estas viendo el horario del EMPLEADO ${numberEmployee}, en caso de no ver la hora que quieres, prueba seleccionando otro empleado.`
          : `Actualmente estas viendo el horario del EMPLEADO ${numberEmployee}`}
      </p>
      <div className="SelectHour__Container--Employees">
        {employeesByService.map(({ idUsuario }, index) => (
          <Employees
            key={index}
            dateInformation={dateInformation}
            idUsuario={idUsuario}
            setInformationDate={setInformationDate}
            dateFormatted={dateFormatted}
            setNumberEmployee={setNumberEmployee}
            numberEmployee={numberEmployee}
            index={index}
          />
        ))}
      </div>
      {hoursByEmployeeSelected && (
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
      )}
    </div>
  );
}
