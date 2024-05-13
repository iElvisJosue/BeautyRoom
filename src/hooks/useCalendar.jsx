import { useState, useEffect } from "react";

import { weekDays, shortMonthNames, fullMonthNames } from "../helpers/Calendar";

export default function useCalendar() {
  const [monthNumber, setMonthNumber] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [calendarDetails, setCalendarDetails] = useState([]);
  const [staticMonthNumber, setStaticMonthNumber] = useState(null);
  const [staticDay, setStaticDay] = useState(null);
  const [optionYear, setOptionYear] = useState(0);

  useEffect(() => {
    optionYear <= 0 ? getCurrentCalendar() : getNextYearCalendar();
  }, [optionYear]);

  const getCurrentCalendar = () => {
    const getDate = new Date();
    setDetailsCalendar(getDate);
  };
  const getNextYearCalendar = () => {
    const getDate = new Date(currentYear + 1, 0, 1);
    setDetailsCalendar(getDate);
  };
  const setDetailsCalendar = (yearSelected) => {
    const getYear = yearSelected.getFullYear();
    const getMonth = yearSelected.getMonth() + 1;
    const getDay = yearSelected.getDate();
    setCurrentYear(getYear);
    setMonthNumber(getMonth);
    setStaticMonthNumber(getMonth);
    setStaticDay(getDay);
    updateCalendar(getYear, getMonth);
  };

  useEffect(() => {
    if (monthNumber !== null) {
      const getDate =
        optionYear <= 0 ? new Date() : new Date(currentYear, 0, 1);
      const getYear = getDate.getFullYear();
      updateCalendar(getYear, monthNumber);
    }
  }, [monthNumber]);

  // ESTE NO SE VA A TOCAR
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
    setOptionYear,
  };
}
