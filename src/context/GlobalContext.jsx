import { createContext, useState, useContext, useEffect } from "react";
import {
  login,
  createUser,
  updateOneDataUser,
  verifyUser,
  getEmployees,
  getAllClientsByFilter,
  getAllEmployeesExist,
  getAllEmployeesByService,
  verifyToken,
  logoutUser,
  createOneTicket,
  getAllSalesPerDay,
  getAllSalesByFilter,
} from "../api/authGlobal";
import Cookies from "js-cookie";

export const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debería ser usado dentro de GlobalProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasCookie, setHasCookie] = useState(false);
  const [loading, setLoading] = useState(true);
  const setError = () => {
    setUser(null);
    setHasCookie(false);
    setLoading(false);
  };
  const setSuccess = (res) => {
    setUser(res);
    setLoading(false);
    setHasCookie(true);
    return res;
  };
  // COMPROBAR SI TIENE UN COOKIE
  useEffect(() => {
    async function checkCookie() {
      const cookies = Cookies.get();
      if (!cookies.accessToken) {
        console.log("NO HAY COOKIE :(");
        setError();
        return;
      }
      try {
        const res = await verifyToken({ cookie: cookies.accessToken });
        if (!res.data) {
          setError();
          return;
        } else {
          setSuccess(res.data);
          return;
        }
      } catch (error) {
        setError();
        return;
      }
    }
    checkCookie();
  }, []);

  const loginUser = async (data) => {
    try {
      const res = await login(data);
      if (!res.data) {
        return setError();
      }
      Cookies.set("accessToken", res.data.accessToken, {
        expires: 1,
      });
      return setSuccess(res.data.user);
    } catch (error) {
      setError();
      return error;
    }
  };
  const createNewUser = async (data) => {
    try {
      const res = await createUser(data);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };
  const verifyUserExist = async (data) => {
    try {
      const res = await verifyUser(data);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const getAllEmployees = async () => {
    try {
      const res = await getEmployees();
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };
  const getClientsByFilter = async (data) => {
    try {
      const res = await getAllClientsByFilter(data);
      return res;
    } catch (error) {
      setError();
    }
  };
  const getEmployeesExist = async () => {
    try {
      const res = await getAllEmployeesExist();
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };
  const getEmployeesByService = async (data) => {
    try {
      const res = await getAllEmployeesByService(data);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };
  const updateDataUser = async (data) => {
    try {
      const res = await updateOneDataUser(data);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const logout = async () => {
    await logoutUser();
    return setError();
  };

  const createTicket = async (data) => {
    try {
      const res = await createOneTicket(data);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const getSalesPerDay = async (data) => {
    try {
      const res = await getAllSalesPerDay(data);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const getSalesByFilter = async (data) => {
    try {
      const res = await getAllSalesByFilter(data);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        logout,
        loading,
        hasCookie,
        updateDataUser,
        loginUser,
        createNewUser,
        verifyUserExist,
        getAllEmployees,
        getClientsByFilter,
        getEmployeesExist,
        getEmployeesByService,
        createTicket,
        getSalesPerDay,
        getSalesByFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
