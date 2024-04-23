import axios from "./axios";

// PETICIÓN PARA INICIAR SESIÓN
export const login = (data) => axios.post("/global/loginUser", data);
// PETICIÓN PARA VERIFICAR TOKEN DEL NAVEGADOR
export const verifyToken = () => axios.get("/global/verifyToken");
