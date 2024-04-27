// IMPORTAMOS LOS ESTILOS
import "../styles/DateCreated.css";

export default function DateCreated() {
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
        <a
          className="DateCreated__Container--Button"
          href="https://www.embeautyroom.site/AgendarCita"
        >
          Agendar otra cita <ion-icon name="arrow-forward-outline"></ion-icon>
        </a>
      </div>
    </main>
  );
}
