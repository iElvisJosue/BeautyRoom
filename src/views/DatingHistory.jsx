import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import NotResults from "../components/NotResults";
import DateInformation from "../components/DateInformation";
import Menu from "../components/Menu";
import EditDate from "../components/EditDate";
import ModalChangeStatusDate from "../components/ModalChangeStatusDate";

// IMPORTAMOS LOS HOOKS
import useGetDates from "../hooks/useGetDates";
import useMenu from "../hooks/useMenu";
import useEditDate from "../hooks/useEditDate";
import useDataDate from "../hooks/useDataDate";
import useGetEmployees from "../hooks/useGetEmployees";
import useGetServices from "../hooks/useGetServices";
import useGetHours from "../hooks/useGetHours";
import useModalChangeStatusDate from "../hooks/useModalChangeStatusDate";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS ESTILOS
import "../styles/DatingHistory.css";

export default function DatingHistory() {
  const [idDateUpdate, setIdDateUpdate] = useState(null);
  const { user } = useGlobal();
  const { services } = useGetServices();
  const { hours, searchingHours } = useGetHours();
  const { totalDates, searchingDates, setFilter, filter } = useGetDates();
  const { showEditDate, setShowEditDate } = useEditDate();
  const { showMenu, setShowMenu } = useMenu();
  const { currentDataDate, setCurrentDataDate } = useDataDate();
  const { employees, searchingEmployees } = useGetEmployees();
  const {
    showModalChangeStatusDate,
    setShowModalChangeStatusDate,
    textModalChangeStatusDate,
    setTextModalChangeStatusDate,
  } = useModalChangeStatusDate();

  const getDatesByFilters = (event) => {
    const value = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(value) || value === "") {
      const filter = event.target.value;
      setFilter(filter);
    }
  };

  // PROBABLEMENTE DEBA PONER UN
  // if(searchingDates) return <Loader/>

  const titleSection =
    user.rolUsuario === "Administrador"
      ? "Historial de citas"
      : "Citas asignadas";

  return (
    <main className="DatingHistory">
      <ModalChangeStatusDate
        setShowModalChangeStatusDate={setShowModalChangeStatusDate}
        showModalChangeStatusDate={showModalChangeStatusDate}
        textModalChangeStatusDate={textModalChangeStatusDate}
        idDateUpdate={idDateUpdate}
        setFilter={setFilter}
        filter={filter}
      />
      <Navbar setShowMenu={setShowMenu}>{titleSection}</Navbar>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu}></Menu>
      {showEditDate ? (
        <EditDate
          setShowEditDate={setShowEditDate}
          currentDataDate={currentDataDate}
          employees={employees}
          searchingEmployees={searchingEmployees}
          setFilter={setFilter}
          filter={filter}
          services={services}
          hours={hours}
          searchingHours={searchingHours}
        ></EditDate>
      ) : (
        <div className="DatingHistory__Container">
          <h1 className="DatingHistory__Container--Title">
            Total de citas: {totalDates.length}
          </h1>
          <h1 className="DatingHistory__Container--SubTitle">Buscar citas:</h1>
          <div className="DatingHistory__Container--Filters">
            <input
              type="text"
              placeholder="Fecha (AAAA-MM-DD), Folio, Motivo o Nombre del cliente"
              className="DatingHistory__Container--Filters--Input"
              onChange={getDatesByFilters}
            />
          </div>
          <div className="DatingHistory__Container--Dates">
            {searchingDates ? (
              <Loader responsive={true} />
            ) : totalDates.length > 0 ? (
              totalDates.map(
                (
                  dataDate
                  //   {
                  //   idCita,
                  //   FechaCita,
                  //   HoraCita,
                  //   NombreCliente,
                  //   TelefonoCliente,
                  //   ImagenCita,
                  //   MotivoCita,
                  //   EmpleadoAsignado,
                  // }
                ) => (
                  <DateInformation
                    key={dataDate.idCita}
                    dataDate={dataDate}
                    // idCita={idCita}
                    // FechaCita={FechaCita}
                    // HoraCita={HoraCita}
                    // NombreCliente={NombreCliente}
                    // TelefonoCliente={TelefonoCliente}
                    // ImagenCita={ImagenCita}
                    // MotivoCita={MotivoCita}
                    // EmpleadoAsignado={EmpleadoAsignado}
                    setShowEditDate={setShowEditDate}
                    setCurrentDataDate={setCurrentDataDate}
                    setShowModalChangeStatusDate={setShowModalChangeStatusDate}
                    setTextModalChangeStatusDate={setTextModalChangeStatusDate}
                    setIdDateUpdate={setIdDateUpdate}
                  />
                )
              )
            ) : (
              <NotResults responsive={true}>
                ¡No se encontraron <br />
                citas registradas! <br />
              </NotResults>
            )}
          </div>
        </div>
      )}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
