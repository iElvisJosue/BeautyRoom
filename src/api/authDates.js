import axios from "./axios";

// PETICIÓN PARA VERIFICAR SI YA EXISTE UNA CITA
export const verifyAllDates = (data) => axios.post("/dates/verifyDate", data);

// PETICIÓN PARA VERIFICAR SI EXISTE UNA CITA CON LA MISMA FECHA Y HORA
export const verifyDateDuplicateExist = (data) =>
  axios.post("/dates/verifyDateExist", data);

// PETICIÓN PARA OBTENER CITAS CON FILTROS
export const getDatesFiltered = (data) =>
  axios.post("/dates/getDatesFiltered", data);

// PETICIÓN PARA CREAR UNA CITA POR EL ADMIN
export const adminCreateDate = (data) =>
  axios.post("/dates/adminCreateDate", data);

// PETICIÓN PARA ACTUALIZAR UNA CITA
export const updateDate = (data) => axios.put("/dates/updateDate", data);
// PETICIÓN PARA ACTUALIZAR EL ESTADO DE UNA CITA
export const updateDateByStatus = (data) =>
  axios.put("/dates/updateDateByStatus", data);

// PETICIÓN PARA CREAR UNA ORDEN DE PAGO PARA LA CITA
export const createPayment = (data) => axios.post("/dates/createOrder", data);

// PETICIÓN PARA OBTENER LAS CITAS DE UN EMPLEADO
export const getAllDatesByFilterUser = (data) =>
  axios.post("/dates/getDatesFilteredByUser", data);

// PETICIÓN PARA VALIDAR UNA CITA
export const validateAllDatesFolio = (data) =>
  axios.post("/dates/validateDateFolio", data);
