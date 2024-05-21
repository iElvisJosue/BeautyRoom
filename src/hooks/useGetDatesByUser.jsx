/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";
import { useDates } from "../context/DatesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetDatesByUser() {
  const { user } = useGlobal();
  const { getDatesByFilterUser } = useDates();
  const [totalDates, setTotalDates] = useState(false);
  const [searchingDates, setSearchingDates] = useState(true);
  const [filter, setFilter] = useState({
    idEmpleado: user?.nombreUsuario,
    status: "Espera",
  });

  useEffect(() => {
    async function getAllDates() {
      try {
        const res = await getDatesByFilterUser(filter);
        setTotalDates(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingDates(false);
    }
    getAllDates();
  }, [filter]);

  return { totalDates, setTotalDates, searchingDates, setFilter, filter };
}
