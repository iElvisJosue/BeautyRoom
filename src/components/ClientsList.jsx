/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES
import NotResults from "../components/NotResults";
import Loader from "../components/Loader";

// IMPORTAMOS LOS HOOKS A USAR+
import useGetClientHistoryByFilter from "../hooks/useGetClientHistoryByFilter";
import usePagination from "../hooks/usePagination";

// IMPORTAMOS LOS ESTILOS
import "../styles/ClientsList.css";

export default function ClientsList({
  // clients,
  setShowClientHistory,
  setClientSelected,
}) {
  // const [clientsList, setClientsList] = useState(clients);
  const [typeContentGrid, setTypeContentGrid] = useState(true);
  const { historyByFilter, searchingHistoryByFilter, setFilterHistory } =
    useGetClientHistoryByFilter();
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
    const cantidadDePaginas = Math.ceil(
      historyByFilter.length / amountRegisters
    );
    setAmountPages(cantidadDePaginas);
  }, [historyByFilter]);

  const formatNumber = (number) => {
    if (number.length === 10) {
      let formattedNumber = number.split("");
      for (let i = 3; i <= 7; i += 4) {
        formattedNumber.splice(i, 0, "-");
      }
      return formattedNumber.join("");
    } else {
      return number;
    }
  };

  const getClientsByFilter = (event) => {
    const value = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(value)) {
      const filter = event.target.value;
      setFilterHistory(filter);
      resetValues();
    }
  };

  const handleClientHistory = (NombreCliente) => {
    setShowClientHistory(true);
    setClientSelected(NombreCliente);
  };

  if (searchingHistoryByFilter) return <Loader />;

  const loadTypeContentGrid = () => {
    const list = (
      <div
        className="ClientsList__Container__Grid"
        key={historyByFilter.length}
      >
        <h1 className="ClientsList__Container__Grid__Title">
          Total de clientes ({historyByFilter.length})
        </h1>
        {historyByFilter
          .slice(startIndex, endIndex)
          .map((clientInformation) => (
            <section
              className="ClientsList__Container__Grid__Card"
              key={clientInformation.idCliente}
              id={clientInformation.idCliente}
              onClick={() =>
                handleClientHistory(clientInformation.NombreCliente)
              }
            >
              <div className="ClientsList__Container__Grid__Card--Details">
                <picture className="ClientsList__Container__Grid__Card--Details--Img">
                  <img
                    src="IconoCliente.png"
                    alt="Icono representativo de cliente"
                  />
                </picture>
                <span className="ClientsList__Container__Grid__Card--Details--Information">
                  <p className="ClientsList__Container__Grid__Card--Details--Information--Text ID">
                    #{clientInformation.idCliente}
                  </p>
                  <p className="ClientsList__Container__Grid__Card--Details--Information--Text">
                    👤 {clientInformation.NombreCliente}
                  </p>
                  <p className="ClientsList__Container__Grid__Card--Details--Information--Text">
                    📱 {formatNumber(clientInformation.TelefonoCliente)}
                  </p>
                </span>
              </div>
            </section>
          ))}
        <p className="ClientsList__Container__Grid--Pages">
          ({page}/{amountPages})
        </p>
      </div>
    );

    return list;
  };

  const loadTypeContentTable = () => {
    const table = (
      <>
        <div className="ClientsList__Container__Table">
          <div className="ClientsList__Container__Table__Content">
            <table className="ClientsList__Container__Table__Content--Table">
              <thead className="ClientsList__Container__Table__Content--Table--Headers">
                <tr>
                  <th colSpan="5">
                    Total de clientes ({historyByFilter.length})
                  </th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Compras</th>
                </tr>
              </thead>
              <tbody className="ClientsList__Container__Table__Content--Table--Body">
                {historyByFilter
                  .slice(startIndex, endIndex)
                  .map(({ idCliente, NombreCliente, TelefonoCliente }) => (
                    <tr key={idCliente}>
                      <td>{idCliente}</td>
                      <td>{NombreCliente}</td>
                      <td>{formatNumber(TelefonoCliente)}</td>
                      <td>
                        <button
                          className="ClientsList__Container__Table__Content--Table--Body--Button"
                          onClick={() => handleClientHistory(NombreCliente)}
                        >
                          <ion-icon name="eye-outline"></ion-icon>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="Sales__All--TableList--Pages">
          ({page}/{amountPages})
        </p>
      </>
    );

    return table;
  };

  return (
    <>
      <div className="ClientsList">
        <picture className="ClientsList__Picture">
          <img
            src="ListaDeClientes.png"
            alt="Imagen representativa de lista de clientes"
          />
        </picture>
        <div className="ClientsList__Search">
          <h1 className="ClientsList__Search--Title">Buscar cliente:</h1>
          <input
            type="text"
            placeholder="Ingresa el nombre del cliente..."
            className="ClientsList__Search--Input"
            onChange={getClientsByFilter}
          />
        </div>
        <button
          className="ClientsList__Button--Content"
          onClick={() => setTypeContentGrid(!typeContentGrid)}
        >
          <ion-icon
            name={typeContentGrid ? "list-outline" : "grid-outline"}
          ></ion-icon>
        </button>
        <div className="ClientsList__Buttons">
          {startIndex >= amountRegisters && (
            <button
              className="ClientsList__Buttons--Button Prev"
              onClick={handleShowTwentyFiveLess}
            >
              <ion-icon name="arrow-back-outline"></ion-icon>
            </button>
          )}
          {endIndex < historyByFilter.length && (
            <button
              className="ClientsList__Buttons--Button Next"
              onClick={handleShowTwentyFiveMore}
            >
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
          )}
        </div>
        {historyByFilter.length > 0 ? (
          typeContentGrid ? (
            loadTypeContentGrid()
          ) : (
            loadTypeContentTable()
          )
        ) : (
          <NotResults responsive={true}>No hay clientes registrados</NotResults>
        )}
      </div>
    </>
  );
}
