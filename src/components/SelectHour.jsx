/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES
import HourDetails from "./HourDetails";
import Loader from "../components/Loader";

// IMPORTAMOS LOS HOOKS A USAR
import useCheckDates from "../hooks/useCheckDates";

// IMPORTAMOS LAS AYUDAS
import { hours } from "../helpers/Hours";
import { DateFormatted } from "../helpers/DateFormatted";

// IMPORTAMOS LOS ESTILOS
import "../styles/SelectHour.css";

export default function SelectHour({
  dayDate,
  setDayDate,
  setProgressDate,
  monthNumber,
}) {
  const { day, year } = dayDate;
  const dateFormatted = DateFormatted(year, monthNumber, day);
  const { allDates, searchingDates } = useCheckDates({ dateFormatted });

  if (searchingDates) return <Loader />;
  const hoursInThisDay = allDates.data.map(({ HoraCita }) => HoraCita);
  const getUniqueHours = new Set(hoursInThisDay);
  const hoursFiltered = [...getUniqueHours];

  return (
    <div className="SelectHour__Container">
      <p className="SelectHour__Title">Selecciona una hora</p>
      <p className="SelectHour__Subtitle">{`Has seleccionado el día ${dayDate.dayName.toUpperCase()} ${
        dayDate.day
      } de ${dayDate.monthDay.toUpperCase()} del ${dayDate.year}`}</p>

      <div className="SelectHour__Calendar">
        {hours.map((hour, index) => {
          const hourExist = hoursFiltered.includes(hour);
          if (hourExist) {
            return;
          } else {
            return (
              <HourDetails
                hour={hour}
                dateDay={dayDate}
                setDayDate={setDayDate}
                setProgressDate={setProgressDate}
                key={index}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
