// LIBRERÍAS A USAR
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  // const { user, logout } = useGlobal();
  const { logout } = useGlobal();
  const navigate = useNavigate();

  const cookieName = "accessToken";

  const logoutUser = () => {
    setLoading(true);
    setTimeout(() => {
      Cookies.remove(cookieName);
      navigate("/");
    }, 2000);
  };

  const closingSession = (e) => {
    e.preventDefault();
    const promise = new Promise(() => {
      setTimeout(() => {
        // logout({ id: user.idUsuario });
        logout();
        Cookies.remove(cookieName);
        return;
      }, 1500);
    });

    toast.promise(promise, {
      loading: "Cerrando sesión...",
    });
  };

  return { closingSession, logoutUser, loading };
}
