// IMPORTAMOS LOS ESTADOS
import { useState } from "react";

export default function useDate() {
  const [dateInformation, setDateInformation] = useState(null);
  // const [dayDate, setDayDate] = useState(null);

  return {
    // dayDate,
    // setDayDate,
    dateInformation,
    setDateInformation,
  };
}
