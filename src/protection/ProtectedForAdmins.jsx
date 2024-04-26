// import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

export default function ProtectedForAdmins() {
  const { user, loading } = useGlobal();
  //   const [role, setRole] = useState(null);

  //   useEffect(() => {
  //     async function checkUserProfile() {
  //       try {
  //         const res = await getUserProfile();
  //         setRole(res.data.role);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     checkUserProfile();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  if (user.userRol === "Administrador") {
    if (loading) return <h1>Loading...</h1>;
    if (user.userRol === "Administrador") {
      return <Outlet />;
    }
    return <Navigate to="/" replace />;
  }
}
