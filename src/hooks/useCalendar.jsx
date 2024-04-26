import { useState, useEffect } from "react";

import { weekDays, shortMonthNames, fullMonthNames } from "../helpers/Calendar";

export default function useCalendar() {
  const [monthNumber, setMonthNumber] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [calendarDetails, setCalendarDetails] = useState([]);
  const [staticMonthNumber, setStaticMonthNumber] = useState(null);
  const [staticDay, setStaticDay] = useState(null);

  useEffect(() => {
    const getCurrentDate = new Date();
    const getCurrentYear = getCurrentDate.getFullYear();
    const getCurrentMonth = getCurrentDate.getMonth() + 1;
    const getCurrentDay = getCurrentDate.getDate();
    setCurrentYear(getCurrentYear);
    setMonthNumber(getCurrentMonth);
    setStaticMonthNumber(getCurrentMonth);
    setStaticDay(getCurrentDay);
    updateCalendar(getCurrentYear, getCurrentMonth);
  }, []);

  useEffect(() => {
    if (monthNumber !== null) {
      const getCurrentDate = new Date();
      const getCurrentYear = getCurrentDate.getFullYear();
      updateCalendar(getCurrentYear, monthNumber);
    }
  }, [monthNumber]);

  function updateCalendar(year, month) {
    const monthDays = new Date(year, month, 0).getDate();
    const details = [];

    for (
      let i = month === staticMonthNumber ? staticDay : 1;
      i <= monthDays;
      i++
    ) {
      const dayName = new Date(year, month - 1, i).getDay();
      details.push({
        day: i,
        dayName: weekDays[dayName],
        shortMonthName: shortMonthNames[month - 1],
      });
    }

    setCalendarDetails(details);
  }

  function prevMonth() {
    setMonthNumber((prev) => (prev === staticMonthNumber ? 12 : prev - 1));
  }

  function nextMonth() {
    setMonthNumber((prev) => (prev === 12 ? staticMonthNumber : prev + 1));
  }

  function formatDate(date) {
    const dateSplit = date.split("-");
    const formattedDate = `${dateSplit[2]} de ${
      fullMonthNames[dateSplit[1] - 1]
    } del ${dateSplit[0]}`;
    return formattedDate;
  }

  return {
    calendarDetails,
    prevMonth,
    nextMonth,
    monthNumber,
    currentYear,
    formatDate,
  };
}
