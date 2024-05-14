import { useState, useEffect } from "react";

import { useGlobal } from "../context/GlobalContext";

import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetClientsByFilter() {
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState(false);
  const { getClientsByFilter } = useGlobal();

  useEffect(() => {
    const getClients = async () => {
      try {
        const res = await getClientsByFilter({ filter });
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          setClients(res.data);
        }
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    };
    getClients();
  }, [filter]);

  return { clients, setFilter };
}
