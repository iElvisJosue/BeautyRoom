import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetEmployeesByService({ NombreServicio }) {
  const [employeesByService, setEmployeesByService] = useState(false);
  const [searchingEmployeesByService, setSearchingEmployeesByService] =
    useState(true);

  const { getEmployeesByService } = useGlobal();

  useEffect(() => {
    async function getAllEmployeesByService() {
      try {
        const res = await getEmployeesByService({ NombreServicio });
        setEmployeesByService(res.data);
      } catch (error) {
        console.log(error);
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingEmployeesByService(false);
    }
    getAllEmployeesByService();
  }, []);

  return {
    employeesByService,
    searchingEmployeesByService,
  };
}
