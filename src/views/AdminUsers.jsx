// LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import AdminUsersAdd from "../components/AdminUsersAdd";
import AdminUsersList from "../components/AdminUsersList";
import AdminUserEdit from "../components/AdminUserEdit";

// IMPORTAMOS LOS HOOKS A USAR
import useSubMenu from "../hooks/useSubMenu";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminUsers.css";

export default function AdminUsers() {
  const [userInformation, setUserInformation] = useState(null);
  const { optionSubMenu, setOptionSubMenu } = useSubMenu();

  const adminUserProps = {
    userInformation,
    setUserInformation,
    setOptionSubMenu,
  };

  const currentViewAdminUser = {
    0: AdminUsersList,
    1: AdminUsersAdd,
    2: AdminUserEdit,
  };

  const OptionAdminUserToRender = currentViewAdminUser[optionSubMenu];

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
        <OptionAdminUserToRender {...adminUserProps} />
      </div>
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
