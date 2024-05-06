import axios from "./axios";

// PETICIÓN PARA OBTENER TODAS LAS CATEGORÍAS DE LOS PRODUCTOS INTERNOS
export const getAllCategoriesAndInternal = () =>
  axios.get("/internal/getCategoriesAndInternal");
// PETICIÓN PARA AGREGAR UNA NUEVA CATEGORÍA A LOS PRODUCTOS INTERNOS
export const addOneCategoryInternal = (data) =>
  axios.post("/internal/addCategoryInternal", data);
// PETICIÓN PARA AGREGAR LA IMAGEN DEL PRODUCTO INTERNO
export const addNewImageInternal = (data) =>
  axios.post("/internal/addImageInternal", data);
// PETICIÓN PARA AGREGAR UN PRODUCTO INTERNO
export const addNewInternal = (data) =>
  axios.post("/internal/addInternal", data);
// PETICIÓN PARA ACTUALIZAR UN PRODUCTO INTERNO
export const updateOneInternal = (data) =>
  axios.put("/internal/updateInternal", data);
// PETICIÓN PARA ELIMINAR UNA CATEGORÍA DE LOS PRODUCTOS INTERNOS
export const deleteOneCategoryInternal = (idCategoriaInterno) =>
  axios.delete(`/internal/deleteCategoryInternal/${idCategoriaInterno}`);
// PETICIÓN PARA ACTUALIZAR UNA CATEGORÍA DE LOS PRODUCTOS INTERNOS
export const updateOneCategoryInternal = (data) =>
  axios.put("/internal/updateCategoryInternal", data);
// PETICIÓN PARA ELIMINAR UN PRODUCTO INTERNO
export const deleteOneInternal = (idProductoInterno) =>
  axios.delete(`/internal/deleteInternal/${idProductoInterno}`);
