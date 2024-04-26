// IMPORTAMOS LOS ESTILOS
import "../styles/Navbar.css";

// eslint-disable-next-line react/prop-types
export default function Navbar({ setShowMenu, children }) {
  return (
    <nav className="Navbar">
      <button className="Navbar__Button" onClick={() => setShowMenu(true)}>
        <ion-icon name="menu-outline"></ion-icon>
      </button>
      <h1 className="Navbar__Tittle">{children}</h1>
      <img
        src="BeautyRoomLogo.png"
        alt="Logo De La Empresa"
        className="Navbar__Logo"
      />
    </nav>
  );
}
