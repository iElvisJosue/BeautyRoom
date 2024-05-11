// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";

// IMPORTAMOS LAS AYUDAS A USAR
import { listMenuOptions } from "../helpers/ListMenuOptions";

// HOOKS A USAR
import useLogout from "../hooks/useLogout";

// IMPORTAMOS LOS ESTILOS
import "../styles/Home.css";

export default function Home() {
  const { user } = useGlobal();
  const { closingSession } = useLogout();

  const rolUsuario = user?.rolUsuario;

  return (
    <main className="Home">
      <Navbar>Beauty Room</Navbar>
      <div className="Home__Container">
        <h1 className="Home__Container--Title">
          Menú Principal, ¿A donde deseas ir?
        </h1>
        <div className="Home__Container--Options">
          {listMenuOptions.map(
            (
              {
                imgMenuOption,
                altImgMenuOption,
                nameMenuOption,
                hrefOption,
                userRol,
              },
              index
            ) =>
              rolUsuario === userRol && (
                <section
                  className="Home__Container--Options--Card"
                  key={index}
                  onClick={() => (window.location.href = hrefOption)}
                >
                  <img
                    src={imgMenuOption}
                    alt={altImgMenuOption}
                    className="Home__Container--Options--Card--Img"
                  />
                  <p className="Home__Container--Options--Card--Title">
                    {nameMenuOption}
                  </p>
                </section>
              )
          )}
          <section
            className="Home__Container--Options--Card Logout"
            onClick={closingSession}
          >
            <img
              src="CerrarSesion.png"
              alt="Icono De Cierre De Sesión"
              className="Home__Container--Options--Card--Img"
            />
            <p className="Home__Container--Options--Card--Title">
              Cerrar Sesión
            </p>
          </section>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
