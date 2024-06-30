import { createContext, useContext } from "react";
import { getStatusTolerance, updateStatusTolerance } from "../api/authSettings";

export const SettingsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a AdminPro");
  }
  return context;
};

const getTolerance = async () => {
  try {
    const res = await getStatusTolerance();
    return res;
  } catch (error) {
    return error;
  }
};
const updateTolerance = async (data) => {
  try {
    const res = await updateStatusTolerance(data);
    return res;
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line react/prop-types
export const SettingsProvider = ({ children }) => {
  return (
    <SettingsContext.Provider
      value={{
        getTolerance,
        updateTolerance,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
