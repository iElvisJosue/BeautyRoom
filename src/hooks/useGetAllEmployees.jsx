import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetAllEmployees() {
  const [employeesExist, setEmployeesExist] = useState(false);
  const [searchingExist, setSearchingExist] = useState(true);
  const { getEmployeesExist } = useGlobal();

  useEffect(() => {
    async function getAllEmployees() {
      try {
        const res = await getEmployeesExist();
        setEmployeesExist(res.data);
        setSearchingExist(false);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getAllEmployees();
  }, []);

  return {
    employeesExist,
    searchingExist,
  };
}
