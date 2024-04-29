// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SelectService from "../components/SelectService";
import SelectDay from "../components/SelectDay";
import SelectHour from "../components/SelectHour";
import DataClient from "../components/DataClient";
import Menu from "../components/Menu";

// IMPORTAMOS LOS HOOKS
import useDate from "../hooks/useDate";
import useCalendar from "../hooks/useCalendar";
import useProgressDate from "../hooks/useProgressDate";
import useMenu from "../hooks/useMenu";

// IMPORTAMOS LOS ESTILOS
import "../styles/Date.css";

export default function Date() {
  const { user } = useGlobal();
  const { showMenu, setShowMenu } = useMenu();
  const { progressDate, setProgressDate } = useProgressDate();
  // const { dayDate, setDayDate } = useDate();
  const { dateInformation, setDateInformation } = useDate();
  const { calendarDetails, currentYear, monthNumber, nextMonth, prevMonth } =
    useCalendar();

  const dateProps = {
    // dayDate,
    // setDayDate,
    dateInformation,
    setDateInformation,
    progressDate,
    setProgressDate,
    calendarDetails,
    currentYear,
    monthNumber,
    nextMonth,
    prevMonth,
  };

  const currentProgressDate = {
    0: SelectService,
    1: SelectDay,
    2: SelectHour,
    3: DataClient,
  };

  const ProgressDateToRender = currentProgressDate[progressDate];

  return (
    <main className="Date">
      <Navbar setShowMenu={setShowMenu}>Agendar Cita</Navbar>
      {user?.rolUsuario === "Administrador" && (
        <Menu showMenu={showMenu} setShowMenu={setShowMenu}></Menu>
      )}
      <ProgressDateToRender {...dateProps} />
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
