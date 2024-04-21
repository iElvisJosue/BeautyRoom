/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/SelectHour.css";

// IMPORTAMOS LAS AYUDAS
import { hours } from "../helpers/Hours";

// IMPORTAMOS LOS COMPONENTES
import HourDetails from "./HourDetails";

export default function SelectHour({ dayDate, setDayDate, setProgressDate }) {
  return (
    // <main className="SelectHour">
    <div className="SelectHour__Container">
      <p className="SelectHour__Title">Selecciona una hora</p>
      <p className="SelectHour__Subtitle">{`Has seleccionado el día ${dayDate.dayName.toUpperCase()} ${
        dayDate.day
      } de ${dayDate.monthDay.toUpperCase()} del ${dayDate.year}`}</p>

      <div className="SelectHour__Calendar">
        {hours.map(({ hour, time }, index) => (
          <HourDetails
            hour={hour}
            time={time}
            dateDay={dayDate}
            setDayDate={setDayDate}
            setProgressDate={setProgressDate}
            key={index}
          />
        ))}
      </div>
    </div>
    // </main>
  );
}
