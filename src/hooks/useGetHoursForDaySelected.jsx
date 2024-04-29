// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetHoursForDaySelected({
  NombreServicio,
  FechaCita,
}) {
  const { getHoursForDaySelected } = useServices();
  const [hoursAvailable, setHoursAvailable] = useState(false);
  const [searchingEmployees, setSearchingEmployees] = useState(true);

  useEffect(() => {
    async function getHoursAvailable() {
      try {
        const res = await getHoursForDaySelected({ NombreServicio, FechaCita });
        setHoursAvailable(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingEmployees(false);
    }
    getHoursAvailable();
  }, []);

  return {
    hoursAvailable,
    searchingEmployees,
  };
}
