// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSettings } from "../context/SettingsContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetStatusTolerance() {
  const { getTolerance } = useSettings();
  const [statusTolerance, setStatusTolerance] = useState(false);
  const [getStatusToleranceAgain, setGetStatusToleranceAgain] = useState(false);

  useEffect(() => {
    async function getAllTolerance() {
      try {
        const res = await getTolerance();
        setStatusTolerance(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getAllTolerance();
  }, [getStatusToleranceAgain]);

  return {
    statusTolerance,
    getStatusToleranceAgain,
    setGetStatusToleranceAgain,
  };
}
