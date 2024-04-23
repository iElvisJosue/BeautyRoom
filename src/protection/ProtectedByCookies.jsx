import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Loader from "../components/Loader";

export default function ProtectedByCookies() {
  const { loading, hasCookie } = useGlobal();

  if (loading) return <Loader />;
  if (!loading && !hasCookie) return <Navigate to="/" replace />;

  return <Outlet />;
}
