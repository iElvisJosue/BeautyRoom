import { createContext, useContext } from "react";
import {
  getAllDates,
  createNewDate,
  verifyAllDates,
  verifyDateDuplicateExist,
} from "../api/authDates";

export const DatesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDates = () => {
  const context = useContext(DatesContext);
  if (!context) {
    throw new Error("useDates must be used within a AdminPro");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const DatesProvider = ({ children }) => {
  const getDates = async () => {
    try {
      const res = await getAllDates();
      if (!res.data) {
        return console.log("HUBO UN ERROR AL OBTENER LAS CITAS");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const createDate = async (data) => {
    try {
      const res = await createNewDate(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR AL CREAR LA CITA");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const verifyDate = async (data) => {
    try {
      const res = await verifyAllDates(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR AL VERIFICAR LAS CITAS");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const verifyDateExist = async (data) => {
    try {
      const res = await verifyDateDuplicateExist(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR AL VERIFICAR LA CITA");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <DatesContext.Provider
      value={{
        getDates,
        createDate,
        verifyDate,
        verifyDateExist,
      }}
    >
      {children}
    </DatesContext.Provider>
  );
};
