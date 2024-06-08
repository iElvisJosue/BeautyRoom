// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetClients() {
  const { getClients } = useGlobal();
  const [clients, setClients] = useState(false);
  const [searchingClients, setSearchingClients] = useState(true);

  useEffect(() => {
    async function getAllClients() {
      try {
        const res = await getClients();
        setClients(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingClients(false);
    }
    getAllClients();
  }, []);

  return {
    clients,
    searchingClients,
  };
}
