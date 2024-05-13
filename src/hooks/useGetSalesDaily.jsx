// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetSalesDaily() {
  // OBTENEMOS LA FECHA ACTUAL
  const currentDate = new Date();

  const today = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  const { getSalesPerDay } = useGlobal();
  const [date, setDate] = useState(today);
  const [salesDaily, setSalesDaily] = useState([]);
  const [searchingSales, setSearchingSales] = useState(true);

  useEffect(() => {
    async function getAllSalesDaily() {
      try {
        const res = await getSalesPerDay({ date });
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
  }, [date]);

  return { salesDaily, searchingSales, setDate };
}
