import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetServices() {
  const { getServices } = useServices();

  const [services, setServices] = useState(false);
  const [searchingServices, setSearchingServices] = useState(true);

  useEffect(() => {
    async function getServicesData() {
      try {
        const res = await getServices();
        setServices(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingServices(false);
    }
    getServicesData();
  }, []);

  return {
    services,
    searchingServices,
  };
}
