import axios from "./axios";

// RUTA PARA OBTENER LA CONFIGURACIÓN DE LA TOLERANCIA
export const getStatusTolerance = () => axios.get("/settings/getTolerance");
// RUTA PARA ACTUALIZAR LA CONFIGURACIÓN DE LA TOLERANCIA
export const updateStatusTolerance = (data) =>
  axios.put("/settings/updateTolerance", data);
