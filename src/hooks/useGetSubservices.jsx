import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetSubservices({ idServicio }) {
  const { getSubservices } = useServices();

  const [subservices, setSubservices] = useState(false);
  const [searchingSubservices, setSearchingSubservices] = useState(true);

  useEffect(() => {
    async function getSubservicesData() {
      try {
        const res = await getSubservices({ idServicio });
        setSubservices(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingSubservices(false);
    }
    getSubservicesData();
  }, []);

  return {
    subservices,
    searchingSubservices,
  };
}
