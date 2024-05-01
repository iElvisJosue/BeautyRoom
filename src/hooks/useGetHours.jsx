// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetHours() {
  const { getHours } = useServices();
  const [hours, setHours] = useState(false);
  const [searchingHours, setSearchingHours] = useState(true);

  useEffect(() => {
    async function getAllHours() {
      try {
        const res = await getHours();
        setHours(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingHours(false);
    }
    getAllHours();
  }, []);

  return {
    hours,
    searchingHours,
  };
}
