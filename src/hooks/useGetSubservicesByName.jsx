import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetSubservicesByName({ NombreServicio }) {
  const { getSubservicesByNameService } = useServices();
  const [currentNameService, setCurrentNameService] = useState(NombreServicio);
  const [subservicesByName, setSubservicesByName] = useState(false);
  const [searchingSubservices, setSearchingSubservices] = useState(true);

  useEffect(() => {
    async function getSubservicesByNameData() {
      try {
        const res = await getSubservicesByNameService({
          NombreServicio: currentNameService,
        });
        setSubservicesByName(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingSubservices(false);
    }
    getSubservicesByNameData();
  }, [currentNameService]);

  return {
    subservicesByName,
    searchingSubservices,
    setCurrentNameService,
  };
}
