import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS CONTEXTOS
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import NotResults from "../components/NotResults";
import DateInformation from "../components/DateInformation";
import ModalChangeStatusDate from "../components/ModalChangeStatusDate";

// IMPORTAMOS LOS HOOKS
import useGetDatesByUser from "../hooks/useGetDatesByUser";
import useModalChangeStatusDate from "../hooks/useModalChangeStatusDate";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminDates.css";

export default function MyDates() {
  const { user } = useGlobal();
  const [idDateUpdate, setIdDateUpdate] = useState(null);
  const [optionSubMenu, setOptionSubMenu] = useState(0);
  const { totalDates, searchingDates, setFilter, filter } = useGetDatesByUser();
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
      setFilter({
        idEmpleado: user?.id,
        filter,
      });
    }
  };

  const getDatesWaiting = () => {
    setFilter({
      idEmpleado: user?.id,
      status: "Espera",
    });
    setOptionSubMenu(0);
  };
  const getDatesCompleted = () => {
    setFilter({
      idEmpleado: user?.id,
      status: "Completada",
    });
    setOptionSubMenu(1);
  };
  const getDatesNotAttended = () => {
    setFilter({
      idEmpleado: user?.id,
      status: "No asistio",
    });
    setOptionSubMenu(2);
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
        getDatesWaiting={getDatesWaiting}
      />
      <Navbar>Administrar Citas</Navbar>
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
        <div className="DatingHistory__Container--Status">
          <button
            className={`DatingHistory__Container--Status--Button ${
              optionSubMenu === 0 ? "Active" : ""
            }`}
            onClick={getDatesWaiting}
          >
            <ion-icon name="time-outline"></ion-icon> Espera
          </button>
          <button
            className={`DatingHistory__Container--Status--Button ${
              optionSubMenu === 1 ? "Active" : ""
            }`}
            onClick={getDatesCompleted}
          >
            <ion-icon name="checkmark-circle-outline"></ion-icon> Completada
          </button>
          <button
            className={`DatingHistory__Container--Status--Button ${
              optionSubMenu === 2 ? "Active" : ""
            }`}
            onClick={getDatesNotAttended}
          >
            <ion-icon name="close-circle-outline"></ion-icon> No Asistió
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
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
