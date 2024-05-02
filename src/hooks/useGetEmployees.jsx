import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetEmployees() {
  const [employees, setEmployees] = useState(false);
  const [searchingEmployees, setSearchingEmployees] = useState(true);

  const { getAllEmployees } = useGlobal();

  useEffect(() => {
    async function getEmployees() {
      try {
        const res = await getAllEmployees();
        setEmployees(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingEmployees(false);
    }
    getEmployees();
  }, []);

  return {
    employees,
    searchingEmployees,
  };
}
