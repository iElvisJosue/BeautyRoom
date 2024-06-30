import { useState, useEffect } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import NotResults from "../components/NotResults";
import DateInformation from "../components/DateInformation";
import EditDate from "../components/EditDate";
import ModalChangeStatusDate from "../components/ModalChangeStatusDate";

// IMPORTAMOS LOS CONTEXTOS
import { useSettings } from "../context/SettingsContext";

// IMPORTAMOS LOS HOOKS
import useGetDates from "../hooks/useGetDates";
import useEditDate from "../hooks/useEditDate";
import useDataDate from "../hooks/useDataDate";
import useGetEmployees from "../hooks/useGetEmployees";
import useGetServices from "../hooks/useGetServices";
import useGetHours from "../hooks/useGetHours";
import useModalChangeStatusDate from "../hooks/useModalChangeStatusDate";
import usePagination from "../hooks/usePagination";
import useGetStatusTolerance from "../hooks/useGetStatusTolerance";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminDates.css";

export default function AdminDates() {
  const { updateTolerance } = useSettings();
  const {
    statusTolerance,
    getStatusToleranceAgain,
    setGetStatusToleranceAgain,
  } = useGetStatusTolerance();
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
  const {
    amountRegisters,
    page,
    startIndex,
    endIndex,
    amountPages,
    setAmountPages,
    handleShowTwentyFiveMore,
    handleShowTwentyFiveLess,
    resetValues,
  } = usePagination();

  useEffect(() => {
    if (totalDates) {
      const cantidadDePaginas = Math.ceil(totalDates.length / amountRegisters);
      setAmountPages(cantidadDePaginas);
    }
  }, [totalDates]);

  const getDatesByFilters = (event) => {
    setOptionSubMenu(4);
    const value = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(value)) {
      const filter = event.target.value;
      setFilter(filter);
      resetValues();
    }
    if (value === "") {
      setFilter("Sin confirmar");
      setOptionSubMenu("Sin confirmar");
      resetValues();
    }
  };
  const getDatesByFilter = (status) => {
    setFilter(status);
    setOptionSubMenu(status);
  };
  const handleTolerance = async () => {
    try {
      const res = await updateTolerance({ statusTolerance: !statusTolerance });
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        setGetStatusToleranceAgain(!getStatusToleranceAgain);
        const { status, data } = res;
        handleResponseMessages({ status, data });
      }
    } catch (error) {
      console.error(error);
      handleResponseMessages(error);
    }
  };

  const classContainerTolerance = statusTolerance
    ? "DatingHistory__Container--Tolerance Active"
    : "DatingHistory__Container--Tolerance";

  return (
    <main className="AdminDates">
      <ModalChangeStatusDate
        setShowModalChangeStatusDate={setShowModalChangeStatusDate}
        showModalChangeStatusDate={showModalChangeStatusDate}
        textModalChangeStatusDate={textModalChangeStatusDate}
        idDateUpdate={idDateUpdate}
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
            Mostrando un total de {totalDates.length} citas <br />(
            {filter.toUpperCase()})
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
              className={`DatingHistory__Container--Status--Button--SinConfirmar ${
                optionSubMenu === "Sin confirmar" ? "Active" : ""
              }`}
              onClick={() => getDatesByFilter("Sin confirmar")}
            >
              <ion-icon name="time-outline"></ion-icon> Sin confirmar
            </button>
            <button
              className={`DatingHistory__Container--Status--Button--Confirmada ${
                optionSubMenu === "Confirmada" ? "Active" : ""
              }`}
              onClick={() => getDatesByFilter("Confirmada")}
            >
              <ion-icon name="checkmark-circle-outline"></ion-icon>Confirmadas
            </button>
            <button
              className={`DatingHistory__Container--Status--Button--Completada ${
                optionSubMenu === "Completada" ? "Active" : ""
              }`}
              onClick={() => getDatesByFilter("Completada")}
            >
              <ion-icon name="checkmark-done-circle-outline"></ion-icon>{" "}
              Completadas
            </button>
            <button
              className={`DatingHistory__Container--Status--Button--NoAsistio ${
                optionSubMenu === "No Asistio" ? "Active" : ""
              }`}
              onClick={() => getDatesByFilter("No Asistio")}
            >
              <ion-icon name="close-circle-outline"></ion-icon> No Asistieron
            </button>
          </div>
          {filter === "Sin confirmar" && (
            <div className={classContainerTolerance}>
              Tolerancia de confirmación (
              {statusTolerance ? "15 minutos" : "Ilimitado"}
              ):
              <span
                className="DatingHistory__Container--Tolerance--Button"
                onClick={handleTolerance}
              >
                <button className="DatingHistory__Container--Tolerance--Button--Button">
                  {statusTolerance ? (
                    <ion-icon name="stopwatch-outline"></ion-icon>
                  ) : (
                    <ion-icon name="close-circle-outline"></ion-icon>
                  )}
                </button>
              </span>
            </div>
          )}
          <div className="Sales__All--Buttons--Pages">
            {startIndex >= amountRegisters && (
              <button
                className="Sales__All--TableList--Buttons--Pages--Button Prev"
                onClick={handleShowTwentyFiveLess}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {endIndex < totalDates.length && (
              <button
                className="Sales__All--TableList--Buttons--Pages--Button Next"
                onClick={handleShowTwentyFiveMore}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          <div className="DatingHistory__Container--Dates">
            {searchingDates ? (
              <Loader responsive={true} />
            ) : totalDates.length > 0 ? (
              totalDates
                .slice(startIndex, endIndex)
                .map((dataDate) => (
                  <DateInformation
                    statusTolerance={statusTolerance}
                    key={dataDate.idCita}
                    dataDate={dataDate}
                    setShowEditDate={setShowEditDate}
                    setCurrentDataDate={setCurrentDataDate}
                    setShowModalChangeStatusDate={setShowModalChangeStatusDate}
                    setTextModalChangeStatusDate={setTextModalChangeStatusDate}
                    setIdDateUpdate={setIdDateUpdate}
                    setGetDatesByFilterAgain={setGetDatesByFilterAgain}
                    getDatesByFilterAgain={getDatesByFilterAgain}
                  />
                ))
            ) : (
              <NotResults responsive={true}>
                ¡No se encontraron <br />
                citas registradas! <br />
              </NotResults>
            )}
          </div>
          {totalDates.length > 0 && (
            <p className="Sales__All--TableList--Pages">
              ({page}/{amountPages})
            </p>
          )}
        </div>
      )}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
