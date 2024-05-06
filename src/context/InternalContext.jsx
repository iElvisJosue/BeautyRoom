import { createContext, useContext } from "react";
import {
  getAllCategoriesAndInternal,
  addOneCategoryInternal,
  addNewImageInternal,
  addNewInternal,
  updateOneInternal,
  deleteOneCategoryInternal,
  updateOneCategoryInternal,
  deleteOneInternal,
} from "../api/authInternal";

export const InternalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useInternal = () => {
  const context = useContext(InternalContext);
  if (!context) {
    throw new Error("useInternal must be used within a AdminPro");
  }
  return context;
};

const getCategoriesAndInternal = async () => {
  try {
    const res = await getAllCategoriesAndInternal();
    return res;
  } catch (error) {
    return error;
  }
};

const addCategoryInternal = async (data) => {
  try {
    const res = await addOneCategoryInternal(data);
    return res;
  } catch (error) {
    return error;
  }
};

const addImageInternal = async (data) => {
  try {
    const res = await addNewImageInternal(data);
    return res;
  } catch (error) {
    return error;
  }
};

const addInternal = async (data) => {
  try {
    const res = await addNewInternal(data);
    return res;
  } catch (error) {
    return error;
  }
};

const updateInternal = async (data) => {
  try {
    const res = await updateOneInternal(data);
    return res;
  } catch (error) {
    return error;
  }
};

const deleteCategoryInternal = async (data) => {
  try {
    const res = await deleteOneCategoryInternal(data);
    return res;
  } catch (error) {
    return error;
  }
};

const updateCategoryInternal = async (data) => {
  try {
    const res = await updateOneCategoryInternal(data);
    return res;
  } catch (error) {
    return error;
  }
};

const deleteInternal = async (data) => {
  try {
    const res = await deleteOneInternal(data);
    return res;
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line react/prop-types
export const InternalProvider = ({ children }) => {
  return (
    <InternalContext.Provider
      value={{
        getCategoriesAndInternal,
        addCategoryInternal,
        addImageInternal,
        addInternal,
        updateInternal,
        deleteCategoryInternal,
        updateCategoryInternal,
        deleteInternal,
      }}
    >
      {children}
    </InternalContext.Provider>
  );
};
