// IMPORTAMOS LOS ESTADOS
import { useState } from "react";

export default function useDate() {
  const [dayDate, setDayDate] = useState(null);

  return {
    dayDate,
    setDayDate,
  };
}
