/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/Navbar.css";

// IMPORTAMOS LOS CONTEXTOS A USAR
// import { useGlobal } from "../context/GlobalContext";

export default function Navbar({ children }) {
  // const { user } = useGlobal();

  // const seeOptionMenu = user ? true : false;

  return (
    <nav className="Navbar">
      {/* {seeOptionMenu ? (
        <a className="Navbar__Button" href="/Principal">
          <ion-icon name="home"></ion-icon>
          Menú
        </a>
      ) : (
        <img
          src="BeautyRoomLogo.png"
          alt="Logo De La Empresa"
          className="Navbar__Logo"
        />
      )} */}
      <a className="Navbar__Button" href="/Principal">
        <ion-icon name="home"></ion-icon>
        Menú
      </a>
      <h1 className="Navbar__Tittle">{children}</h1>
      <img
        src="BeautyRoomLogo.png"
        alt="Logo De La Empresa"
        className="Navbar__Logo"
      />
    </nav>
  );
}
