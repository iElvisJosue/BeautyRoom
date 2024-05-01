/* eslint-disable react/prop-types */
export default function Employees({
  dateInformation,
  idUsuario,
  setInformationDate,
  dateFormatted,
  setNumberEmployee,
  numberEmployee,
  index,
}) {
  const handleIdEmployee = () => {
    dateInformation.EmpleadoAsignado = idUsuario;
    setNumberEmployee(index + 1);
    setInformationDate({
      EmpleadoAsignado: idUsuario,
      FechaCita: dateFormatted,
    });
  };

  const classEmployeeDetails =
    numberEmployee === index + 1
      ? "SelectHour__Container--Employees--Details Selected"
      : "SelectHour__Container--Employees--Details";

  return (
    <span
      className={classEmployeeDetails}
      id={idUsuario}
      onClick={handleIdEmployee}
    >
      <img src="IconoEmpleado.png" alt="Icono del Empleado" />
      <p>#{index + 1}</p>
    </span>
  );
}
