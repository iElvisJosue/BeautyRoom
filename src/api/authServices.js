import axios from "./axios";

// PETICIÓN PARA OBTENER TODOS LOS SERVICIOS DISPONIBLES
export const getAllServices = () => axios.get("/services/getServices");
// PETICIÓN PARA OBTENER TODAS LAS HORAS
export const getAllHours = () => axios.get("/services/getHours");
// PETICIÓN PARA OBTENER LAS HORAS DE EL SERVICIO SELECCIONADO
export const getAllHoursAvailableForService = (data) =>
  axios.post("/services/getHoursForService", data);
// PETICIÓN PARA VALIDAR DISPONIBILIDAD DE HORAS EN ESE DÍA
export const getHoursAvailableForDaySelected = (data) =>
  axios.post("/services/getHoursAvailableForDaySelected", data);
