// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SelectService from "../components/SelectService";
import SelectSubservice from "../components/SelectSubservice";
import SelectDay from "../components/SelectDay";
import SelectHour from "../components/SelectHour";
import DataClient from "../components/DataClient";
// import Menu from "../components/Menu";

// IMPORTAMOS LOS HOOKS
import useDate from "../hooks/useDate";
import useCalendar from "../hooks/useCalendar";
import useProgressDate from "../hooks/useProgressDate";
// import useMenu from "../hooks/useMenu";

// IMPORTAMOS LOS ESTILOS
import "../styles/Date.css";

export default function Date() {
  // const { showMenu, setShowMenu } = useMenu();
  const { progressDate, setProgressDate } = useProgressDate();
  const { dateInformation, setDateInformation } = useDate();
  const { calendarDetails, currentYear, monthNumber, nextMonth, prevMonth } =
    useCalendar();

  const dateProps = {
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
    1: SelectSubservice,
    2: SelectDay,
    3: SelectHour,
    4: DataClient,
  };

  const ProgressDateToRender = currentProgressDate[progressDate];

  return (
    <main className="Date">
      <Navbar seeOptionMenu={false}>Agendar Cita</Navbar>
      {/* <Menu showMenu={showMenu} setShowMenu={setShowMenu}></Menu> */}
      <ProgressDateToRender {...dateProps} />
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
