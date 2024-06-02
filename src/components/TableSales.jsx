/* eslint-disable react/prop-types */

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG, HOST_PDF } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/TableSales.css";

export default function TableSales({ salesList, startIndex, endIndex }) {
  return (
    <div className="Sales__All--TableList">
      <table className="Sales__All--TableList--Table">
        <thead className="Sales__All--TableList--Table--Headers">
          <tr>
            <th colSpan="9">Total de ventas ({salesList.length})</th>
          </tr>
          <tr>
            <th>Folio</th>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Total</th>
            <th>Empleado</th>
            <th>Cliente</th>
            <th>Ticket</th>
          </tr>
        </thead>
        <tbody className="Sales__All--TableList--Table--Body">
          {salesList
            .slice(startIndex, endIndex)
            .map(
              (
                {
                  Folio,
                  ImagenProducto,
                  Cantidad,
                  Nombre,
                  TotalProducto,
                  FechaVenta,
                  HoraVenta,
                  EmpleadoAsignado,
                  Cliente,
                  Ticket,
                },
                index
              ) => (
                <tr key={index}>
                  <td>{Folio}</td>
                  <td>
                    <img
                      className="Sales__All--TableList--Table--Body--Picture"
                      src={`${HOST_IMG}/${ImagenProducto}`}
                      alt="Imagen Representativa del Producto"
                    />
                  </td>
                  <td>
                    x{Cantidad} - {Nombre}
                  </td>
                  <td>{FechaVenta.substring(0, 10)}</td>
                  <td>{HoraVenta}</td>
                  <td>
                    {TotalProducto.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>{EmpleadoAsignado}</td>
                  <td>{Cliente}</td>
                  <td>
                    <a
                      className="Sales__All--TableList--Table--Body--Ticket"
                      href={`${HOST_PDF}/${Ticket}`}
                      target="_blank"
                    >
                      <ion-icon name="document-text-outline"></ion-icon>
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
