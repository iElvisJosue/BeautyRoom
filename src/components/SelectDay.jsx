/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/SelectDay.css";

// IMPORTAMOS LOS COMPONENTES
import DayDetails from "./DayDetails";

// IMPORTAMOS LOS HOOKS
import useCalendar from "../hooks/useCalendar";

// IMPORTAMOS LAS AYUDAS
import { shortMonthNames } from "../helpers/Calendar";

export default function SelectDay({
  dayDate,
  setDayDate,
  progressDate,
  setProgressDate,
}) {
  const { calendarDetails, currentYear, monthNumber, nextMonth, prevMonth } =
    useCalendar();

  return (
    // <main className="SelectDay">
    <div className="SelectDay__Container">
      <p className="SelectDay__Title">Selecciona una fecha</p>
      {calendarDetails.length > 0 && (
        <>
          <div className="SelectDay__Months">
            <p>{shortMonthNames[monthNumber - 2 < 0 ? 11 : monthNumber - 2]}</p>
            <button onClick={prevMonth} className="SelectDay__Months--Button">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <p>{shortMonthNames[monthNumber - 1]}</p>
            <button onClick={nextMonth} className="SelectDay__Months--Button">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <p>{shortMonthNames[monthNumber % 12]}</p>
          </div>
          <div className="SelectDay__Calendar">
            {calendarDetails.map(({ day, dayName, shortMonthName }, index) => (
              <DayDetails
                monthNumber={monthNumber}
                day={day}
                dayName={dayName}
                shortMonthName={shortMonthName}
                dayDate={dayDate}
                setDayDate={setDayDate}
                currentYear={currentYear}
                progressDate={progressDate}
                setProgressDate={setProgressDate}
                key={index}
              />
            ))}
          </div>
        </>
      )}
    </div>
    // </main>
  );
}
