import { createContext, useContext } from "react";
import {
  addOneCategoryProduct,
  verifyAllsCategoryProduct,
  getAllCategoriesAndProducts,
  addNewImageProduct,
  addNewProduct,
  deleteOneProduct,
} from "../api/authProducts";

export const ProductsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a AdminPro");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ProductsProvider = ({ children }) => {
  const addCategoryProduct = async (data) => {
    try {
      const res = await addOneCategoryProduct(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const verifyCategoryProductExist = async (data) => {
    try {
      const res = await verifyAllsCategoryProduct(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const getCategoriesAndProducts = async () => {
    try {
      const res = await getAllCategoriesAndProducts();
      return res;
    } catch (error) {
      return error;
    }
  };

  const addImageProduct = async (data) => {
    try {
      const res = await addNewImageProduct(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const addProduct = async (data) => {
    try {
      const res = await addNewProduct(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const deleteProduct = async (data) => {
    try {
      const res = await deleteOneProduct(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        addCategoryProduct,
        verifyCategoryProductExist,
        getCategoriesAndProducts,
        addImageProduct,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
