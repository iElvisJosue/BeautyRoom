import axios from "./axios";

// PETICIÓN PARA INICIAR SESIÓN
export const login = (data) => axios.post("/global/loginUser", data);
// PETICIÓN PARA VERIFICAR SI EXISTE UN USUARIO
export const verifyUser = (data) => axios.post("/global/verifyUserExist", data);
// PETICIÓN PARA CREAR UN USUARIO
export const createUser = (data) => axios.post("/global/createUser", data);
// PETICIÓN PARA CERRAR SESIÓN
export const logoutUser = () => axios.post("/global/logout");
// PETICIÓN PARA OBTENER A LOS EMPLEADOS
export const getEmployees = () => axios.get("/global/getEmployees");
// PETICIÓN PARA VERIFICAR TOKEN DEL NAVEGADOR
export const verifyToken = () => axios.get("/global/verifyToken");
