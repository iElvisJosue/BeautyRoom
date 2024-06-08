/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetClientHistory({ NombreCliente }) {
  const { getClientHistory } = useGlobal();
  const [clientHistory, setClientHistory] = useState(false);
  const [searchingClientHistory, setSearchingClientHistory] = useState(true);

  useEffect(() => {
    async function getOneClientHistory() {
      try {
        const res = await getClientHistory({ NombreCliente });
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          setClientHistory(res.data);
          setSearchingClientHistory(false);
        }
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }

    getOneClientHistory();
  }, []);

  return {
    clientHistory,
    searchingClientHistory,
  };
}
