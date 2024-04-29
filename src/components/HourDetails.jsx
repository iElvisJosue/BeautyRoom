/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { toast } from "sonner";

// IMPORTAMOS LOS ESTILOS
import "../styles/HourDetails.css";

export default function HourDetails({
  HoraServicio,
  setProgressDate,
  dateInformation,
  setDateInformation,
  // hour,
  // dateDay,
  // setDayDate,
  // setProgressDate,
}) {
  const selectedHour = () => {
    setDateInformation({ ...dateInformation, HoraCita: HoraServicio });
    toast.success("Hora seleccionada correctamente ✨");
    setProgressDate(3);
  };

  const hourFormatted = HoraServicio.substring(0, 5);
  const timeFormatted = HoraServicio.substring(6, 9);

  return (
    <section className="SelectHour__Calendar--Details" onClick={selectedHour}>
      <span className="SelectHour__Calendar--Details--Date">
        <p className="SelectHour__Calendar--Details--Date--Day">Hora</p>
        <p className="SelectHour__Calendar--Details--Date--DayNumber">
          {hourFormatted}
        </p>
        <p className="SelectHour__Calendar--Details--Date--Month">
          {timeFormatted}
        </p>
      </span>
      <span className="SelectHour__Calendar--Details--Icon">
        <button className="SelectHour__Calendar--Details--Icon--Button">
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
      </span>
    </section>
  );
}
