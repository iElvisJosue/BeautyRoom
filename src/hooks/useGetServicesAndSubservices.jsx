import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetServicesAndSubservices() {
  const { getServicesAndSubservices } = useServices();
  const [services, setServices] = useState(false);
  const [searchingServices, setSearchingServices] = useState(true);
  const [getServicesAndSubservicesAgain, setGetServicesAndSubservicesAgain] =
    useState(false);

  useEffect(() => {
    async function getServicesAndSubservicesData() {
      try {
        const res = await getServicesAndSubservices();
        setServices(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingServices(false);
    }
    getServicesAndSubservicesData();
  }, [getServicesAndSubservicesAgain]);

  return {
    services,
    searchingServices,
    setGetServicesAndSubservicesAgain,
    getServicesAndSubservicesAgain,
  };
}
