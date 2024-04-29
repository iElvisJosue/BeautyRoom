/* eslint-disable react/prop-types */

// IMPORTAMOS LAS LIBRERÍAS A USAR
import { toast } from "sonner";

// IMPORTAMOS LOS ESTILOS
import "../styles/ServiceDetails.css";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";

export default function ServiceDetails({
  setProgressDate,
  setDateInformation,
  NombreServicio,
  ImagenServicio,
  idServicio,
}) {
  const selectedDate = () => {
    toast.success("Servicio seleccionado correctamente ✨");
    setDateInformation({ NombreServicio, ImagenServicio, idServicio });
    setProgressDate(1);
  };

  return (
    <section
      className="SelectService__Details__Container"
      onClick={selectedDate}
      id={idServicio}
    >
      <img
        src={`${HOST_IMG}/${ImagenServicio}`}
        alt="Imagen Representativa del Servicio"
        className="SelectService__Details__Container--Img"
      />
      <p className="SelectService__Details__Container--Title">
        {NombreServicio}
      </p>
    </section>
  );
}
