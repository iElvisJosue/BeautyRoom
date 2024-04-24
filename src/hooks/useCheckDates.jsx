// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";

export default function useCheckDates({ dateFormatted }) {
  const [allDates, setDates] = useState(false);
  const { verifyDate } = useDates();
  const [searchingDates, setSearchingDates] = useState(true);

  useEffect(() => {
    async function verifyDates() {
      try {
        const res = await verifyDate({ FechaCita: dateFormatted });
        setDates(res);
      } catch (error) {
        console.log(error);
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingDates(false);
    }
    verifyDates();
  }, []);

  return { allDates, searchingDates };
}
