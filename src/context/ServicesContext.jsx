import { createContext, useContext } from "react";
import {
  getAllServices,
  getAllSubservices,
  getAllSubservicesByNameService,
  getAllHours,
  getAllHoursByEmployeeSelected,
  getHoursAvailableForDaySelected,
} from "../api/authServices";

export const ServicesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a AdminPro");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ServicesProvider = ({ children }) => {
  const getServices = async () => {
    try {
      const res = await getAllServices();
      return res;
    } catch (error) {
      return error;
    }
  };
  const getSubservices = async (data) => {
    try {
      const res = await getAllSubservices(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const getSubservicesByNameService = async (data) => {
    try {
      const res = await getAllSubservicesByNameService(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const getHours = async () => {
    try {
      const res = await getAllHours();
      return res;
    } catch (error) {
      return error;
    }
  };
  const getHoursForDaySelected = async (data) => {
    try {
      const res = await getHoursAvailableForDaySelected(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const getHoursByEmployeeSelected = async (data) => {
    try {
      const res = await getAllHoursByEmployeeSelected(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        getServices,
        getSubservices,
        getSubservicesByNameService,
        getHours,
        getHoursByEmployeeSelected,
        getHoursForDaySelected,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
