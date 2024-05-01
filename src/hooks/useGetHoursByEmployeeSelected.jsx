// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetHoursByEmployeeSelected() {
  const { getHoursByEmployeeSelected } = useServices();
  const [informationDate, setInformationDate] = useState();
  const [hoursByEmployeeSelected, setHoursByEmployeeSelected] = useState(false);

  useEffect(() => {
    async function getAllHoursByEmployeeSelected() {
      try {
        const res = await getHoursByEmployeeSelected(informationDate);
        setHoursByEmployeeSelected(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getAllHoursByEmployeeSelected();
  }, [informationDate]);

  return {
    hoursByEmployeeSelected,
    setInformationDate,
  };
}
