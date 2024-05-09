import { createContext, useState, useContext, useEffect } from "react";
import {
  login,
  createUser,
  updateOneDataUser,
  verifyUser,
  getEmployees,
  getAllEmployeesExist,
  getAllEmployeesByService,
  verifyToken,
  logoutUser,
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
  const [isLogin, setIsLogin] = useState(false);
  const [hasCookie, setHasCookie] = useState(false);
  const [loading, setLoading] = useState(true);
  const setError = () => {
    setUser(null);
    setIsLogin(false);
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
        const res = await verifyToken(cookies.accessToken);
        if (!res.data) {
          setError();
          return;
        }
        setSuccess(res.data);
        if (res.data.online) {
          setIsLogin(true);
        }
        return;
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
      Cookies.set("accessToken", res.data.accessToken);
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

  return (
    <GlobalContext.Provider
      value={{
        user,
        logout,
        loading,
        isLogin,
        hasCookie,
        updateDataUser,
        loginUser,
        createNewUser,
        verifyUserExist,
        getAllEmployees,
        getEmployeesExist,
        getEmployeesByService,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
