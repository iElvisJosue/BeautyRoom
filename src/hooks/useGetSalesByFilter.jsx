// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetSalesByFilter() {
  const { getSalesByFilter } = useGlobal();
  const [salesByFilter, setSalesByFilter] = useState([]);
  const [searchingSalesByFilter, setSearchingSalesByFilter] = useState(true);
  const [filterSales, setFilterSales] = useState("");

  useEffect(() => {
    async function getAllSalesByFilter() {
      try {
        const res = await getSalesByFilter({ filterSales });
        console.log(res);
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          setSalesByFilter(res.data);
          setSearchingSalesByFilter(false);
        }
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getAllSalesByFilter();
  }, [filterSales]);

  return { salesByFilter, searchingSalesByFilter, setFilterSales };
}
