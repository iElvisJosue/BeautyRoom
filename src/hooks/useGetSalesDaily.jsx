// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetSalesDaily() {
  // OBTENEMOS LA FECHA ACTUAL
  const { getSalesPerDay } = useGlobal();
  // const [date, setDate] = useState();
  const [salesDaily, setSalesDaily] = useState([]);
  const [searchingSales, setSearchingSales] = useState(true);
  const [firstDate, setFirstDate] = useState(getFechaActual());
  const [secondDate, setSecondDate] = useState(getFechaActual());

  function getFechaActual() {
    const now = new Date();
    const tzoffset = now.getTimezoneOffset() * 60000; // offset en milisegundos
    return new Date(now - tzoffset).toISOString().split("T")[0];
  }

  useEffect(() => {
    async function getAllSalesDaily() {
      try {
        const res = await getSalesPerDay({ firstDate, secondDate });
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          setSalesDaily(res.data);
          setSearchingSales(false);
        }
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getAllSalesDaily();
  }, [firstDate, secondDate]);

  return {
    salesDaily,
    searchingSales,
    firstDate,
    secondDate,
    setFirstDate,
    setSecondDate,
  };
}
