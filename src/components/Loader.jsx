import "../styles/Loader.css";

// eslint-disable-next-line react/prop-types
export default function Loader({ responsive = false }) {
  const classLoader = responsive ? "Main__Loader Responsive" : "Main__Loader";
  return (
    <section className={classLoader}>
      <div className="loader"></div>
      <h1>Cargando...</h1>
    </section>
  );
}
