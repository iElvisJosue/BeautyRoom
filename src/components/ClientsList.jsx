/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";

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
          <>
            <div className="ClientsList__Container">
              <div className="ClientsList__Container__Content">
                <table className="ClientsList__Container__Content--Table">
                  <thead className="ClientsList__Container__Content--Table--Headers">
                    <tr>
                      <th colSpan="5">
                        Total de clientes ({historyByFilter.length})
                      </th>
                    </tr>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      {/* <th>Correo</th> */}
                      <th>Compras</th>
                    </tr>
                  </thead>
                  <tbody className="ClientsList__Container__Content--Table--Body">
                    {historyByFilter.slice(startIndex, endIndex).map(
                      ({
                        idCliente,
                        NombreCliente,
                        TelefonoCliente,
                        // CorreoCliente,
                      }) => (
                        <tr key={idCliente}>
                          <td>{idCliente}</td>
                          <td>{NombreCliente}</td>
                          <td>{formatNumber(TelefonoCliente)}</td>
                          {/* <td>{CorreoCliente ?? "No registrado"}</td> */}
                          <td>
                            <button
                              className="ClientsList__Container__Content--Table--Body--Button"
                              onClick={() => handleClientHistory(NombreCliente)}
                            >
                              <ion-icon name="eye-outline"></ion-icon>
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="Sales__All--TableList--Pages">
              ({page}/{amountPages})
            </p>
          </>
        ) : (
          <NotResults>No hay clientes registrados</NotResults>
        )}
      </div>
    </>
  );
}
