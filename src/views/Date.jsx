// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SelectDay from "../components/SelectDay";
import SelectHour from "../components/SelectHour";
import DataClient from "../components/DataClient";

// IMPORTAMOS LOS HOOKS
import useProgressDate from "../components/useProgressDate";
import useDate from "../hooks/useDate";
import useCalendar from "../hooks/useCalendar";

// IMPORTAMOS LOS ESTILOS
import "../styles/Date.css";

export default function Date() {
  const { progressDate, setProgressDate } = useProgressDate();
  const { dayDate, setDayDate } = useDate();
  const { calendarDetails, currentYear, monthNumber, nextMonth, prevMonth } =
    useCalendar();

  const dateProps = {
    dayDate,
    setDayDate,
    progressDate,
    setProgressDate,
    calendarDetails,
    currentYear,
    monthNumber,
    nextMonth,
    prevMonth,
  };

  const currentProgressDate = {
    0: SelectDay,
    1: SelectHour,
    2: DataClient,
  };

  const ProgressDateToRender = currentProgressDate[progressDate];

  return (
    <main className="Date">
      <Navbar>Agendar Cita</Navbar>
      <ProgressDateToRender {...dateProps} />
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
