// LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import AdminUsersAdd from "../components/AdminUsersAdd";
import AdminUsersList from "../components/AdminUsersList";

// IMPORTAMOS LOS HOOKS A USAR
import useSubMenu from "../hooks/useSubMenu";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminUsers.css";

export default function AdminUsers() {
  const { optionSubMenu, setOptionSubMenu } = useSubMenu();

  return (
    <main className="AdminUsers">
      <Navbar>Administrar usuarios</Navbar>
      <div className="AddUsers__Container">
        <SubMenu
          NombreOpciónUno="Lista de usuarios"
          NombreOpciónDos="Agregar Usuario"
          setOptionSubMenu={setOptionSubMenu}
          optionSubMenu={optionSubMenu}
        />
        {optionSubMenu === 0 ? <AdminUsersList /> : <AdminUsersAdd />}
      </div>
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
