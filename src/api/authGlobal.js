import axios from "./axios";

// PETICIÓN PARA INICIAR SESIÓN
export const login = (data) => axios.post("/global/loginUser", data);
// PETICIÓN PARA VERIFICAR SI EXISTE UN USUARIO
export const verifyUser = (data) => axios.post("/global/verifyUserExist", data);
// PETICIÓN PARA CREAR UN USUARIO
export const createUser = (data) => axios.post("/global/createUser", data);
// PETICIÓN PARA ACTUALIZAR LOS DATOS DEL USUARIO
export const updateOneDataUser = (data) =>
  axios.put("/global/updateDataUser", data);
// PETICIÓN PARA CERRAR SESIÓN
export const logoutUser = () => axios.post("/global/logout");
// RUTA PARA OBTENER TODOS LOS CLIENTES POR FILTRO
export const getAllClientsByFilter = (data) =>
  axios.post("/global/getClientsByFilter", data);
// PETICIÓN PARA OBTENER A LOS EMPLEADOS (NO ADMIN  )
export const getEmployees = () => axios.get("/global/getEmployees");
// PETICIÓN PARA OBTENER A LOS EMPLEADOS  (TODOS)
export const getAllEmployeesExist = () => axios.get("/global/getAllEmployees");
// PETICIÓN PARA OBTENER A LOS EMPLEADOS POR SERVICIO
export const getAllEmployeesByService = (data) =>
  axios.post("/global/getEmployeesByService", data);
// PETICIÓN PARA VERIFICAR TOKEN DEL NAVEGADOR
export const verifyToken = (data) => axios.post("/global/verifyToken", data);
// RUTA PARA CREAR EL TICKET
export const createOneTicket = (data) =>
  axios.post("/global/createTicket", data);
// RUTA PARA OBTENER TODAS LAS VENTAS POR DIA
export const getAllSalesPerDay = (data) =>
  axios.post("/global/getSalesPerDay", data);
// RUTA PARA OBTENER LAS VENTAS POR FILTRO
export const getAllSalesByFilter = (data) =>
  axios.post("/global/getSalesByFilter", data);
// RUTA PARA CREAR UN REPORTE
export const createOneReport = (data) =>
  axios.post("/global/createReport", data);
