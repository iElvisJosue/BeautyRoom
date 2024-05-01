/* eslint-disable react/prop-types */

// IMPORTAMOS LAS LIBRERÍAS A USAR
import { toast } from "sonner";

// IMPORTAMOS LOS ESTILOS
import "../styles/SubserviceDetails.css";

export default function SubserviceDetails({
  setProgressDate,
  dateInformation,
  setDateInformation,
  NombreSubservicio,
  CostoSubservicio,
  idSubservicio,
}) {
  const selectedSubservice = () => {
    toast.success("Subservicio seleccionado correctamente ✨");
    setDateInformation({ ...dateInformation, NombreSubservicio });
    setProgressDate(2);
  };

  return (
    <section
      className="SelectSubservice__Details__Container"
      onClick={selectedSubservice}
      id={idSubservicio}
    >
      <p className="SelectSubservice__Details__Container--Title">
        {NombreSubservicio}
      </p>
      <p className="SelectSubservice__Details__Container--Title">
        {`$${CostoSubservicio}.00`}
      </p>
    </section>
  );
}
