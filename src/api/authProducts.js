import axios from "./axios";

// PETICIÓN PARA CREAR UNA CATEGORIA
export const addOneCategoryProduct = (data) =>
  axios.post("/products/addCategoryProduct", data);
// PETICIÓN PARA VERIFICAR SI YA EXISTE UNA CATEGORIA
export const verifyAllsCategoryProduct = (data) =>
  axios.post("/products/verifyCategoryExist", data);
// PETICIÓN PARA OBTENER TODAS LAS CATEGORÍAS Y SUS PRODUCTOS
export const getAllCategoriesAndProducts = () =>
  axios.get("/products/getCategoriesAndProducts");
// PETICIÓN PARA OBTENER TODAS LAS CATEGORÍAS Y SUS PRODUCTOS POR FILTROS
export const getAllCategoriesAndProductsByFilter = (filter) =>
  axios.post("/products/getCategoriesAndProductsByFilter/", filter);
export const addNewImageProduct = (data) =>
  axios.post("/products/addImageProduct", data);
// PETICIÓN PARA AGREGAR UN PRODUCTO
export const addNewProduct = (data) => axios.post("/products/addProduct", data);
// PETICIÓN PARA ACTUALIZAR UN PRODUCTO
export const updateOneProduct = (data) =>
  axios.put("/products/updateProduct", data);
// PETICIÓN PARA ELIMINAR UN PRODUCTO
export const deleteOneProduct = (idProducto) =>
  axios.delete(`/products/deleteProduct/${idProducto}`);
// PETICIÓN PARA ACTUALIZAR UNA CATEGORIA
export const updateOneCategory = (data) =>
  axios.put("/products/updateCategory", data);
// PETICIÓN PARA ELIMINAR UNA CATEGORIA
export const deleteOneCategory = (idCategoriaProducto) =>
  axios.delete(`/products/deleteCategory/${idCategoriaProducto}`);
