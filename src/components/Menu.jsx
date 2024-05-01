/* eslint-disable react/prop-types */

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS A USAR
import { HOST } from "../helpers/Urls";

// HOOKS A USAR
import useLogout from "../hooks/useLogout";

// IMPORTAMOS LOS ESTILOS
import "../styles/Menu.css";

export default function Menu({ setShowMenu, showMenu }) {
  const { user } = useGlobal();
  const { closingSession } = useLogout();
  const classMenu = showMenu ? "Menu Show" : "Menu";

  return (
    <aside className={classMenu}>
      <header className="Menu__Header">
        <button
          className="Menu__Header--Button"
          onClick={() => setShowMenu(false)}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
        <h1 className="Menu__Header--Title">Menu</h1>
      </header>
      <ul className="Menu__Header--List">
        {user.rolUsuario === "Administrador" && (
          <>
            <li
              className="Menu__Header--List--Item"
              onClick={() =>
                (window.location.href = `${HOST}/AdministrarUsuarios`)
              }
            >
              <ion-icon name="people-circle-outline"></ion-icon> Administrar
              usuarios
            </li>
            <li
              className="Menu__Header--List--Item"
              onClick={() =>
                (window.location.href = `${HOST}/AgendarCitaAdministrador`)
              }
            >
              <ion-icon name="calendar-outline"></ion-icon> Agendar cita
            </li>
            <li
              className="Menu__Header--List--Item"
              onClick={() =>
                (window.location.href = `${HOST}/InventarioDeVenta`)
              }
            >
              <ion-icon name="storefront-outline"></ion-icon> Inventario de
              venta
            </li>
            <li
              className="Menu__Header--List--Item"
              onClick={() =>
                (window.location.href = `${HOST}/HistorialDeCitas`)
              }
            >
              <ion-icon name="document-text-outline"></ion-icon> Historial de
              citas
            </li>
          </>
        )}
        <li className="Menu__Header--List--Item" onClick={closingSession}>
          <ion-icon name="log-out-outline"></ion-icon> Cerrar sesión
        </li>
      </ul>
    </aside>
  );
}
