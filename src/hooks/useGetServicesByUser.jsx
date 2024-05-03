import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetServicesByUser(idUsuario) {
  const { getServicesByUser } = useServices();

  const [servicesByUser, setServicesByUser] = useState(false);

  useEffect(() => {
    async function getServicesByUserData() {
      try {
        const res = await getServicesByUser(idUsuario);
        setServicesByUser(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getServicesByUserData();
  }, []);

  return {
    servicesByUser,
  };
}
