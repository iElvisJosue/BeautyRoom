import axios from "./axios";

// PETICIÓN PARA OBTENER TODAS LAS CITAS
export const getAllDates = () => axios.get("/dates/getDates");

// PETICIÓN PARA CREAR UNA NUEVA CITA
export const createNewDate = (data) => axios.post("/dates/createDate", data);
