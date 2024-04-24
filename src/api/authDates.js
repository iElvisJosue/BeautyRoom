import axios from "./axios";

// PETICIÓN PARA OBTENER TODAS LAS CITAS
export const getAllDates = () => axios.get("/dates/getDates");

// PETICIÓN PARA CREAR UNA NUEVA CITA
export const createNewDate = (data) => axios.post("/dates/createDate", data);

// PETICIÓN PARA VERIFICAR SI YA EXISTE UNA CITA
export const verifyAllDates = (data) => axios.post("/dates/verifyDate", data);

// PETICIÓN PARA VERIFICAR SI EXISTE UNA CITA CON LA MISMA FECHA Y HORA
export const verifyDateDuplicateExist = (data) =>
  axios.post("/dates/verifyDateExist", data);
