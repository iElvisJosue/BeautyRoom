import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetServicesAndSubservicesByFilter() {
  const { getServicesAndSubservicesByFilter } = useServices();
  const [filter, setFilter] = useState(false);
  const [servicesAndSubservicesByFilter, setServicesAndSubservicesByFilter] =
    useState(false);
  const [
    getServicesAndSubservicesByFilterAgain,
    setGetServicesAndSubservicesByFilterAgain,
  ] = useState(false);

  useEffect(() => {
    async function getAllServicesAndSubservicesByFilter() {
      try {
        const res = await getServicesAndSubservicesByFilter(filter);
        setServicesAndSubservicesByFilter(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getAllServicesAndSubservicesByFilter();
  }, [filter, getServicesAndSubservicesByFilterAgain]);

  return {
    servicesAndSubservicesByFilter,
    setFilter,
    setGetServicesAndSubservicesByFilterAgain,
    getServicesAndSubservicesByFilterAgain,
  };
}
