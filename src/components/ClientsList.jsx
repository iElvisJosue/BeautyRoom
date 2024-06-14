/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES
import NotResults from "../components/NotResults";

// IMPORTAMOS LOS ESTILOS
import "../styles/ClientsList.css";

export default function ClientsList({
  clients,
  setShowClientHistory,
  setClientSelected,
}) {
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

  const handleClientHistory = (NombreCliente) => {
    setShowClientHistory(true);
    setClientSelected(NombreCliente);
  };
  return (
    <>
      {clients.length > 0 ? (
        <div className="ClientsList">
          <picture className="ClientsList__Picture">
            <img
              src="ListaDeClientes.png"
              alt="Imagen representativa de lista de clientes"
            />
          </picture>
          <div className="ClientsList__Container">
            <div className="ClientsList__Container__Content">
              <table className="ClientsList__Container__Content--Table">
                <thead className="ClientsList__Container__Content--Table--Headers">
                  <tr>
                    <th colSpan="5">Total de clientes ({clients.length})</th>
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
                  {clients.map(
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
        </div>
      ) : (
        <NotResults>No hay clientes</NotResults>
      )}
    </>
  );
}
