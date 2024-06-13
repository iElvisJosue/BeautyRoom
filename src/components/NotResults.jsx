/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../styles/NotResults.css";

export default function NotResults({
  responsive = false,
  secondImage = false,
  children,
}) {
  const classNotResults = responsive ? "NotResults Responsive" : "NotResults";

  const imageNotResults = secondImage
    ? "HorarioCerrado.png"
    : "SinResultados.png";
  return (
    <section className={classNotResults}>
      <img
        src={imageNotResults}
        alt="Sin Resultados"
        className="NotResults__Img"
      />
      <h1 className="NotResults__Title">{children}</h1>
    </section>
  );
}
