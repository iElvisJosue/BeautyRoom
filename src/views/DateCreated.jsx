// IMPORTAMOS LOS CONTEXTOS
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS ESTILOS
import "../styles/DateCreated.css";

export default function DateCreated() {
  const { user } = useGlobal();

  return (
    <main className="DateCreated">
      <div className="DateCreated__Container">
        <img
          src="GraciasPorTuPago.png"
          alt="Icono De Pago"
          className="DateCreated__Container--Img"
        />
        <p className="DateCreated__Container--Title">
          ¡Pago realizado correctamente!
        </p>
        <p className="DateCreated__Container--Title Two">
          Pronto recibirás un mensaje de WhatsApp con los detalles de tu cita.
          ¡Esperamos ansiosos verte pronto!
        </p>
        <span className="DateCreated__Container--Buttons">
          {user?.rolUsuario === "Administrador" && (
            <a
              className="DateCreated__Container--Buttons--Button"
              href="https://www.embeautyroom.site/AdministrarCitas"
            >
              Administrar citas <ion-icon name="calendar-outline"></ion-icon>
            </a>
          )}
          <a
            className="DateCreated__Container--Buttons--Button"
            href="https://www.embeautyroom.site/AgendarCita"
          >
            Agendar otra cita <ion-icon name="arrow-forward-outline"></ion-icon>
          </a>
        </span>
      </div>
    </main>
  );
}
