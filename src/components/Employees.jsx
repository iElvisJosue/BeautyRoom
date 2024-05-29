/* eslint-disable react/prop-types */
export default function Employees({
  dateInformation,
  Usuario,
  setInformationDate,
  dateFormatted,
  setNumberEmployee,
  numberEmployee,
  index,
}) {
  const handleIdEmployee = () => {
    dateInformation.EmpleadoAsignado = Usuario;
    setNumberEmployee(index);
    setInformationDate({
      EmpleadoAsignado: Usuario,
      FechaCita: dateFormatted,
    });
  };

  const classEmployeeDetails =
    numberEmployee === index
      ? "SelectHour__Container--Employees--Details Selected"
      : "SelectHour__Container--Employees--Details";

  return (
    <span
      className={classEmployeeDetails}
      id={Usuario}
      onClick={handleIdEmployee}
    >
      <img src="IconoEmpleado.png" alt="Icono del Empleado" />
      <p>#{index + 1}</p>
    </span>
  );
}
