// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetHoursForService({ NombreServicio }) {
  const { getHoursForService } = useServices();
  const [hoursForService, setHoursForService] = useState([]);
  const [searchingHoursForService, setSearchingHoursForService] =
    useState(true);

  useEffect(() => {
    async function getServicesHours() {
      try {
        const res = await getHoursForService({ NombreServicio });
        setHoursForService(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingHoursForService(false);
    }
    getServicesHours();
  }, []);

  return {
    hoursForService,
    searchingHoursForService,
  };
}
