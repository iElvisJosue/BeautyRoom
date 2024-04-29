/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES
import HourDetails from "./HourDetails";
import Loader from "../components/Loader";

// IMPORTAMOS LOS HOOKS A USAR
// import useCheckDates from "../hooks/useCheckDates";
import useGetHoursForService from "../hooks/useGetHoursForService";
import useGetHoursForDaySelected from "../hooks/useGetHoursForDaySelected";

// IMPORTAMOS LAS AYUDAS
// import { hours } from "../helpers/Hours";
import { DateFormatted } from "../helpers/DateFormatted";

// IMPORTAMOS LOS ESTILOS
import "../styles/SelectHour.css";

export default function SelectHour({
  // dayDate,
  // setDayDate,
  dateInformation,
  setDateInformation,
  setProgressDate,
  monthNumber,
}) {
  const { NombreServicio, DíaCita, DíaCitaNombre, NombreMesCita, AñoCita } =
    dateInformation;
  const dateFormatted = DateFormatted(AñoCita, monthNumber, DíaCita);
  const { hoursForService, searchingHoursForService } = useGetHoursForService({
    NombreServicio,
  });
  const { hoursAvailable, searchingEmployees } = useGetHoursForDaySelected({
    NombreServicio,
    FechaCita: dateFormatted,
  });
  // const { hoursForService, searchingHoursForService } = useGetHoursForService({
  //   NombreServicio,
  // });
  // const { allDates, searchingDates } = useCheckDates({ dateFormatted });

  if (searchingHoursForService || searchingEmployees) return <Loader />;
  // const hoursInThisDay = allDates.data.map(({ HoraCita }) => HoraCita);
  // const getUniqueHours = new Set(hoursInThisDay);
  // const hoursFiltered = [...getUniqueHours];

  return (
    <div className="SelectHour__Container">
      <p className="SelectHour__Title">Selecciona una hora</p>
      <p className="SelectHour__Subtitle">{`Has seleccionado ${NombreServicio.toUpperCase()} para el día ${DíaCitaNombre.toUpperCase()} ${DíaCita} de ${NombreMesCita} del ${AñoCita}`}</p>

      <div className="SelectHour__Calendar">
        {hoursForService.map(({ HoraServicio }, index) => {
          const hourExist = hoursAvailable.includes(HoraServicio);
          if (hourExist) {
            return (
              <HourDetails
                key={index}
                HoraServicio={HoraServicio}
                setProgressDate={setProgressDate}
                dateInformation={dateInformation}
                setDateInformation={setDateInformation}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
