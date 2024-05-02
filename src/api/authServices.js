import axios from "./axios";

// PETICIÓN PARA OBTENER TODOS LOS SERVICIOS DISPONIBLES
export const getAllServices = () => axios.get("/services/getServices");
// PETICIÓN PARA OBTENER TODOS LOS SUBSERVICIOS DISPONIBLES DEL SERVICIO SELECCIONADO PERO POR SU ID
export const getAllSubservices = (data) =>
  axios.post("/services/getSubservices", data);
// PETICIÓN PARA OBTENER TODOS LOS SUBSERVICIOS DISPONIBLES DEL SERVICIO SELECCIONADO PERO POR SU NOMBRE
export const getAllSubservicesByNameService = (data) =>
  axios.post("/services/getSubservicesByNameService", data);
// RUTA PARA OBTENER LOS SERVICIOS Y SUS SUBSERVICIOS
export const getAllServicesAndSubservices = () =>
  axios.get("/services/getServicesAndSubservices");
// PETICIÓN PARA OBTENER TODAS LAS HORAS
export const getAllHours = () => axios.get("/services/getHours");
// PETICIÓN PARA VALIDAR DISPONIBILIDAD DE HORAS EN ESE DÍA
export const getHoursAvailableForDaySelected = (data) =>
  axios.post("/services/getHoursAvailableForDaySelected", data);
// PETICIÓN PARA OBTENER EL HORARIO DE UN EMPLEADO POR SU SERVICIO SELECCIONADO
export const getAllHoursByEmployeeSelected = (data) =>
  axios.post("/services/getHoursByEmployeeSelected", data);
// PETICIÓN PARA AGREGAR UN SUBSERVICIO A UN SERVICIO
export const addNewSubservice = (data) =>
  axios.post("/services/addSubservice", data);
// PETICIÓN PARA ELIMINAR UN SUBSERVICIO DE UN SERVICIO
export const deleteOneSubservice = (idSubservicio) =>
  axios.delete(`/services/deleteSubservice/${idSubservicio}`);
// PETICIÓN PARA ACTUALIZAR UN SUBSERVICIO DE UN SERVICIO
export const updateOneSubservice = (data) =>
  axios.put("/services/updateSubservice", data);
// PETICIÓN PARA AGREGAR LA IMAGEN DEL SERVICIO
export const addNewImageService = (data) =>
  axios.post("/services/addImageService", data);
// PETICIÓN PARA AGREGAR UN SERVICIO
export const addNewService = (data) => axios.post("/services/addService", data);
