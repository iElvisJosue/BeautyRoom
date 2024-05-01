import axios from "./axios";

// PETICIÓN PARA OBTENER TODOS LOS SERVICIOS DISPONIBLES
export const getAllServices = () => axios.get("/services/getServices");
// PETICIÓN PARA OBTENER TODOS LOS SUBSERVICIOS DISPONIBLES DEL SERVICIO SELECCIONADO PERO POR SU ID
export const getAllSubservices = (data) =>
  axios.post("/services/getSubservices", data);
// PETICIÓN PARA OBTENER TODOS LOS SUBSERVICIOS DISPONIBLES DEL SERVICIO SELECCIONADO PERO POR SU NOMBRE
export const getAllSubservicesByNameService = (data) =>
  axios.post("/services/getSubservicesByNameService", data);
// PETICIÓN PARA OBTENER TODAS LAS HORAS
export const getAllHours = () => axios.get("/services/getHours");
// PETICIÓN PARA VALIDAR DISPONIBILIDAD DE HORAS EN ESE DÍA
export const getHoursAvailableForDaySelected = (data) =>
  axios.post("/services/getHoursAvailableForDaySelected", data);
// PETICIÓN PARA OBTENER EL HORARIO DE UN EMPLEADO POR SU SERVICIO SELECCIONADO
export const getAllHoursByEmployeeSelected = (data) =>
  axios.post("/services/getHoursByEmployeeSelected", data);
