/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES
import DayDetails from "./DayDetails";

// IMPORTAMOS LAS AYUDAS
import { shortMonthNames } from "../helpers/Calendar";

// IMPORTAMOS LOS ESTILOS
import "../styles/SelectDay.css";

export default function SelectDay({
  dateInformation,
  setDateInformation,
  progressDate,
  setProgressDate,
  calendarDetails,
  currentYear,
  monthNumber,
  nextMonth,
  prevMonth,
  setOptionYear,
}) {
  const getDate = new Date();

  return (
    <div className="SelectDay__Container">
      <p className="SelectDay__Title">Selecciona una fecha</p>
      {calendarDetails.length > 0 && (
        <>
          <div className="SelectDay__Months">
            <button
              className="SelectDay__Months--Years"
              onClick={() => setOptionYear(0)}
            >
              {getDate.getFullYear()}
            </button>
            <span className="SelectDay__Months--Options">
              <p>
                {shortMonthNames[monthNumber - 2 < 0 ? 11 : monthNumber - 2]}
              </p>
              <button
                onClick={prevMonth}
                className="SelectDay__Months--Options--Button"
              >
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              <p>{shortMonthNames[monthNumber - 1]}</p>
              <button
                onClick={nextMonth}
                className="SelectDay__Months--Options--Button"
              >
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </button>
              <p>{shortMonthNames[monthNumber % 12]}</p>
            </span>
            <button
              className="SelectDay__Months--Years"
              onClick={() => setOptionYear(1)}
            >
              {getDate.getFullYear() + 1}
            </button>
          </div>
          <div className="SelectDay__Calendar">
            {calendarDetails.map(({ day, dayName, shortMonthName }, index) => (
              <DayDetails
                monthNumber={monthNumber}
                day={day}
                dayName={dayName}
                shortMonthName={shortMonthName}
                dateInformation={dateInformation}
                setDateInformation={setDateInformation}
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
  );
}
