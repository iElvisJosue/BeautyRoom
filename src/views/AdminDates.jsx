import { useState } from "react";
import { Toaster, toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import NotResults from "../components/NotResults";
import DateInformation from "../components/DateInformation";
import EditDate from "../components/EditDate";
import ModalChangeStatusDate from "../components/ModalChangeStatusDate";

// IMPORTAMOS LOS HOOKS
import useGetDates from "../hooks/useGetDates";
import useEditDate from "../hooks/useEditDate";
import useDataDate from "../hooks/useDataDate";
import useGetEmployees from "../hooks/useGetEmployees";
import useGetServices from "../hooks/useGetServices";
import useGetHours from "../hooks/useGetHours";
import useModalChangeStatusDate from "../hooks/useModalChangeStatusDate";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminDates.css";

export default function AdminDates() {
  const [idDateUpdate, setIdDateUpdate] = useState(null);
  const [optionSubMenu, setOptionSubMenu] = useState("Sin confirmar");
  const { services } = useGetServices();
  const { hours, searchingHours } = useGetHours();
  const {
    totalDates,
    searchingDates,
    setFilter,
    filter,
    setGetDatesByFilterAgain,
    getDatesByFilterAgain,
  } = useGetDates();
  const { showEditDate, setShowEditDate } = useEditDate();
  const { currentDataDate, setCurrentDataDate } = useDataDate();
  const { employees, searchingEmployees } = useGetEmployees();
  const {
    showModalChangeStatusDate,
    setShowModalChangeStatusDate,
    textModalChangeStatusDate,
    setTextModalChangeStatusDate,
  } = useModalChangeStatusDate();

  const getDatesByFilters = (event) => {
    setOptionSubMenu(4);
    const value = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(value) || value === "") {
      const filter = event.target.value;
      setFilter(filter);
    }
  };
  const getDatesByFilter = (status) => {
    setFilter(status);
    setOptionSubMenu(status);
  };

  // CADA 5 MINUTOS OBTENEMOS NUEVAMENTE LAS CITAS
  setTimeout(() => {
    toast.success(
      "Hemos actualizado satisfactoriamente el registro de las citas. Este proceso volverá a suceder dentro de 5 minutos ✔️"
    );
    setFilter("Sin confirmar");
    setOptionSubMenu("Sin confirmar");
  }, 300000);

  // PROBABLEMENTE DEBA PONER UN
  // if(searchingDates) return <Loader/>

  return (
    <main className="AdminDates">
      <ModalChangeStatusDate
        setShowModalChangeStatusDate={setShowModalChangeStatusDate}
        showModalChangeStatusDate={showModalChangeStatusDate}
        textModalChangeStatusDate={textModalChangeStatusDate}
        idDateUpdate={idDateUpdate}
        // setFilter={setFilter}
        // filter={filter
        getDatesByFilter={getDatesByFilter}
        setGetDatesByFilterAgain={setGetDatesByFilterAgain}
        getDatesByFilterAgain={getDatesByFilterAgain}
      />
      <Navbar>Administrar Citas</Navbar>
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
          getDatesByFilter={getDatesByFilter}
          setGetDatesByFilterAgain={setGetDatesByFilterAgain}
          getDatesByFilterAgain={getDatesByFilterAgain}
        ></EditDate>
      ) : (
        <div className="DatingHistory__Container">
          <h1 className="DatingHistory__Container--Title">
            Mostrando un total de {totalDates.length} citas
          </h1>
          <h1 className="DatingHistory__Container--SubTitle">Buscar citas:</h1>
          <div className="DatingHistory__Container--Filters">
            <input
              type="text"
              placeholder="Fecha (AAAA-MM-DD), Folio, Motivo, Cliente o Empleado"
              className="DatingHistory__Container--Filters--Input"
              onChange={getDatesByFilters}
            />
          </div>
          <div className="DatingHistory__Container--Status">
            <button
              className={`DatingHistory__Container--Status--Button ${
                optionSubMenu === "Sin confirmar" ? "Active" : ""
              }`}
              onClick={() => getDatesByFilter("Sin confirmar")}
            >
              <ion-icon name="time-outline"></ion-icon> Sin confirmar
            </button>
            <button
              className={`DatingHistory__Container--Status--Button ${
                optionSubMenu === "Confirmada" ? "Active" : ""
              }`}
              onClick={() => getDatesByFilter("Confirmada")}
            >
              <ion-icon name="checkmark-circle-outline"></ion-icon>Confirmadas
            </button>
            <button
              className={`DatingHistory__Container--Status--Button ${
                optionSubMenu === "Completada" ? "Active" : ""
              }`}
              onClick={() => getDatesByFilter("Completada")}
            >
              <ion-icon name="checkmark-done-circle-outline"></ion-icon>{" "}
              Completadas
            </button>
            <button
              className={`DatingHistory__Container--Status--Button ${
                optionSubMenu === "No Asistio" ? "Active" : ""
              }`}
              onClick={() => getDatesByFilter("No Asistio")}
            >
              <ion-icon name="close-circle-outline"></ion-icon> No Asistieron
            </button>
          </div>
          <div className="DatingHistory__Container--Dates">
            {searchingDates ? (
              <Loader responsive={true} />
            ) : totalDates.length > 0 ? (
              totalDates.map((dataDate) => (
                <DateInformation
                  key={dataDate.idCita}
                  dataDate={dataDate}
                  setShowEditDate={setShowEditDate}
                  setCurrentDataDate={setCurrentDataDate}
                  setShowModalChangeStatusDate={setShowModalChangeStatusDate}
                  setTextModalChangeStatusDate={setTextModalChangeStatusDate}
                  setIdDateUpdate={setIdDateUpdate}
                />
              ))
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
