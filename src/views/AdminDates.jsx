import { useState } from "react";
import { Toaster } from "sonner";

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
  const { services } = useGetServices();
  const { hours, searchingHours } = useGetHours();
  const { totalDates, searchingDates, setFilter, filter } = useGetDates();
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

  return (
    <main className="AdminDates">
      <ModalChangeStatusDate
        setShowModalChangeStatusDate={setShowModalChangeStatusDate}
        showModalChangeStatusDate={showModalChangeStatusDate}
        textModalChangeStatusDate={textModalChangeStatusDate}
        idDateUpdate={idDateUpdate}
        setFilter={setFilter}
        filter={filter}
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
              placeholder="Fecha (AAAA-MM-DD), Folio, Motivo o Nombre del cliente"
              className="DatingHistory__Container--Filters--Input"
              onChange={getDatesByFilters}
            />
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
