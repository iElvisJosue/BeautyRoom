// IMPORTAMOS LOS ESTADOS
import { useState } from "react";

export default function useDate() {
  const [dateInformation, setDateInformation] = useState(null);

  return {
    dateInformation,
    setDateInformation,
  };
}
