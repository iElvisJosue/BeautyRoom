/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES A USAR
import NotResults from "./NotResults";
import Loader from "./Loader";

// IMPORTAMOS LOS HOOKS A USAR
import useGetClientHistory from "../hooks/useGetClientHistory";

// IMPORTAMOS LAS AYUDAS
import { HOST_PDF, HOST_IMG } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/ClientHistory.css";

export default function ClientHistory({
  clientSelected,
  setShowClientHistory,
}) {
  const { clientHistory, searchingClientHistory } = useGetClientHistory({
    NombreCliente: clientSelected,
  });

  if (searchingClientHistory) return <Loader />;

  const { ComprasCliente, CitasCliente } = clientHistory;

  const MostrarHistorialCompras = () => {
    if (ComprasCliente.length > 0) {
      return (
        <div className="ClientHistory__Container__Content">
          <table className="ClientHistory__Container__Content--Table">
            <thead className="ClientHistory__Container__Content--Table--Headers">
              <tr>
                <th colSpan="6">Total de compras ({ComprasCliente.length})</th>
              </tr>
              <tr>
                <th>Folio</th>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Ticket</th>
              </tr>
            </thead>
            <tbody className="ClientHistory__Container__Content--Table--Body">
              {ComprasCliente.map(
                (
                  {
                    Folio,
                    ImagenProducto,
                    Cantidad,
                    Nombre,
                    FechaVenta,
                    TotalProducto,
                    Ticket,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{Folio}</td>
                    <td>
                      <img
                        className="ClientHistory__Container__Content--Table--Body--Picture"
                        src={`${HOST_IMG}/${ImagenProducto}`}
                        alt="Imagen Representativa del Producto"
                      />
                    </td>
                    <td>
                      x{Cantidad} - {Nombre}
                    </td>
                    <td>
                      {FechaVenta.substring(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                    <td>
                      {TotalProducto.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td>
                      <a
                        className="ClientHistory__Container__Content--Table--Body--Ticket"
                        href={`${HOST_PDF}/${Ticket}`}
                        target="_blank"
                      >
                        <ion-icon name="ticket-outline"></ion-icon>
                      </a>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      );
    }
  };
  const MostrarHistorialCitas = () => {
    if (CitasCliente.length > 0) {
      return (
        <div className="ClientHistory__Container__Content">
          <table className="ClientHistory__Container__Content--Table">
            <thead className="ClientHistory__Container__Content--Table--Headers">
              <tr>
                <th colSpan="7">Total de citas ({CitasCliente.length})</th>
              </tr>
              <tr>
                <th>Folio</th>
                <th>Imagen</th>
                <th>Motivo</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody className="ClientHistory__Container__Content--Table--Body">
              {CitasCliente.map(
                (
                  {
                    idCita,
                    ImagenCita,
                    MotivoCita,
                    SubmotivoCita,
                    FechaCita,
                    HoraCita,
                    CostoCita,
                    EstadoCita,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{idCita}</td>
                    <td>
                      <img
                        className="ClientHistory__Container__Content--Table--Body--Picture"
                        src={`${HOST_IMG}/${ImagenCita}`}
                        alt="Imagen Representativa del Producto"
                      />
                    </td>
                    <td>
                      {MotivoCita} - {SubmotivoCita}
                    </td>
                    <td>
                      {FechaCita.substring(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                    <td>{HoraCita}</td>
                    <td>
                      {CostoCita.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td>{EstadoCita}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="ClientHistory">
      <div className="ClientHistory__Container">
        <button
          className="ClientHistory__Container--Back"
          onClick={() => setShowClientHistory(false)}
        >
          <ion-icon name="chevron-back-outline"></ion-icon> Regresar
        </button>
        {ComprasCliente.length > 0 || CitasCliente.length > 0 ? (
          <>
            <h1 className="ClientHistory__Container--Title">
              Historial de compras de {clientSelected.toUpperCase()}
            </h1>
            <MostrarHistorialCompras />
            <MostrarHistorialCitas />
          </>
        ) : (
          <NotResults>Este cliente no tiene historial</NotResults>
        )}
      </div>
    </div>
  );
}
