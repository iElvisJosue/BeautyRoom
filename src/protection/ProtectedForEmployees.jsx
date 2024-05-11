// import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Loader from "../components/Loader";

export default function ProtectedForEmployees() {
  const { user, loading } = useGlobal();

  if (user.rolUsuario) {
    if (loading) return <Loader />;
    if (!loading && user.rolUsuario === "Empleado") return <Outlet />;
    return <Navigate to="/Principal" replace />;
  }
}
