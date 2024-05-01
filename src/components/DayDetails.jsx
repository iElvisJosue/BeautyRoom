/* eslint-disable react/prop-types */

// IMPORTAMOS LAS LIBRERÍAS A USAR
import { toast } from "sonner";

// IMPORTAMOS LOS ESTILOS
import "../styles/DayDetails.css";

// IMPORTAMOS LAS AYUDAS
import { fullMonthNames } from "../helpers/Calendar";

export default function DayDetails({
  day,
  dayName,
  shortMonthName,
  monthNumber,
  // setDayDate,
  dateInformation,
  setDateInformation,
  currentYear,
  setProgressDate,
}) {
  const selectedDate = () => {
    setDateInformation({
      ...dateInformation,
      DíaCitaNombre: dayName,
      DíaCita: day,
      NombreMesCita: fullMonthNames[monthNumber - 1],
      AñoCita: currentYear,
    });
    toast.success("Fecha seleccionada correctamente ✨");
    setProgressDate(3);
  };

  return (
    <section className="Date__Calendar--Details" onClick={selectedDate}>
      <span className="Date__Calendar--Details--Date">
        <p className="Date__Calendar--Details--Date--Day">{dayName}</p>
        <p className="Date__Calendar--Details--Date--DayNumber">
          {day < 10 ? `0${day}` : day}
        </p>
        <p className="Date__Calendar--Details--Date--Month">{shortMonthName}</p>
      </span>
      <span className="Date__Calendar--Details--Icon">
        <button className="Date__Calendar--Details--Icon--Button">
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
      </span>
    </section>
  );
}
