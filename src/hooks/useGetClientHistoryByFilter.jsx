// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetClientHistoryByFilter() {
  const { getClientHistoryByFilter } = useGlobal();
  const [historyByFilter, setHistoryByFilter] = useState([]);
  const [searchingHistoryByFilter, setSearchingHistoryByFilter] =
    useState(true);
  const [filterHistory, setFilterHistory] = useState("");

  useEffect(() => {
    async function getAllHistoryByFilter() {
      try {
        const res = await getClientHistoryByFilter({ filterHistory });
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          setHistoryByFilter(res.data);
          setSearchingHistoryByFilter(false);
        }
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getAllHistoryByFilter();
  }, [filterHistory]);

  return { historyByFilter, searchingHistoryByFilter, setFilterHistory };
}
