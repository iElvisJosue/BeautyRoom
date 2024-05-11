import { createContext, useContext } from "react";
import {
  getDatesFiltered,
  verifyAllDates,
  verifyDateDuplicateExist,
  adminCreateDate,
  updateDate,
  createPayment,
  updateDateByStatus,
  getAllDatesByFilterUser,
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
  const getDatesByFilter = async (data) => {
    try {
      const res = await getDatesFiltered(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR AL OBTENER LAS CITAS FILTRADAS");
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

  const createOrder = async (data) => {
    try {
      const res = await createPayment(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateOneDate = async (data) => {
    try {
      const res = await updateDate(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const adminCreateNewDate = async (data) => {
    try {
      const res = await adminCreateDate(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateStatusDate = async (data) => {
    try {
      const res = await updateDateByStatus(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const getDatesByFilterUser = async (data) => {
    try {
      const res = await getAllDatesByFilterUser(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <DatesContext.Provider
      value={{
        getDatesByFilter,
        verifyDate,
        verifyDateExist,
        updateOneDate,
        createOrder,
        adminCreateNewDate,
        updateStatusDate,
        getDatesByFilterUser,
      }}
    >
      {children}
    </DatesContext.Provider>
  );
};
