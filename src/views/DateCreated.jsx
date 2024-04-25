// IMPORTAMOS LOS ESTILOS
import "../styles/DateCreated.css";

export default function DateCreated() {
  return (
    <main className="DateCreated">
      <img
        src="GraciasPorTuPago.png"
        alt="Icono De Pago"
        className="DateCreated__Img"
      />
      <p className="DateCreated__Text">
        ¡Gracias por confiar en nosotros y completar tu pago!
      </p>
      <p className="DateCreated__Text Two">
        Pronto recibirás un mensaje de WhatsApp con los detalles de tu cita.
        ¡Esperamos ansiosos verte pronto!
      </p>
      <a
        className="DateCreated__Button"
        href="https://www.embeautyroom.site/AgendarCita"
      >
        Agendar otra cita
      </a>
    </main>
  );
}
