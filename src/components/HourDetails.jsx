/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { toast } from "sonner";

// IMPORTAMOS LOS ESTILOS
import "../styles/HourDetails.css";

export default function HourDetails({
  hour,
  time,
  dateDay,
  setDayDate,
  setProgressDate,
}) {
  const selectedHour = () => {
    setDayDate({ ...dateDay, hour, time });
    toast.success("Hora seleccionada correctamente ✨");
    setProgressDate(2);
  };

  return (
    <section className="SelectHour__Calendar--Details" onClick={selectedHour}>
      <span className="SelectHour__Calendar--Details--Date">
        <p className="SelectHour__Calendar--Details--Date--Day">Hora</p>
        <p className="SelectHour__Calendar--Details--Date--DayNumber">{hour}</p>
        <p className="SelectHour__Calendar--Details--Date--Month">{time}</p>
      </span>
      <span className="SelectHour__Calendar--Details--Icon">
        <button className="SelectHour__Calendar--Details--Icon--Button">
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
      </span>
    </section>
  );
}
