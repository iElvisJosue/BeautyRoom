// IMPORTAMOS LOS COMPONENTES
import { useState } from "react";
import Loader from "../components/Loader";
import NotResults from "../components/NotResults";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useGetSalesDaily from "../hooks/useGetSalesDaily";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG, HOST_PDF } from "../helpers/Urls";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/SalesDaily.css";
import { toast } from "sonner";

export default function SalesDaily() {
  const [report, setReport] = useState(null);
  const { createReport } = useGlobal();
  const {
    salesDaily,
    searchingSales,
    firstDate,
    setFirstDate,
    secondDate,
    setSecondDate,
  } = useGetSalesDaily();

  const handleFirstDate = (event) => {
    setFirstDate(event.target.value);
    setReport(null);
  };
  const handleSecondDate = (event) => {
    setSecondDate(event.target.value);
    setReport(null);
  };

  const handleGenerateReportPDF = async () => {
    const ventasPorEmpleado = {};

    salesDaily.forEach((venta) => {
      if (!ventasPorEmpleado[venta.EmpleadoAsignado]) {
        ventasPorEmpleado[venta.EmpleadoAsignado] = [];
      }
      venta.primeraFecha = firstDate;
      venta.segundaFecha = secondDate;
      ventasPorEmpleado[venta.EmpleadoAsignado].push(venta);
    });
    try {
      const res = await createReport(ventasPorEmpleado);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        setReport(res.data);
        toast.success("Reporte generado correctamente ✔️");
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <div className="Sales__Daily">
      <div className="Sales__Daily--Buttons">
        <input
          type="date"
          name="FirstDate"
          id="FirstDate"
          value={firstDate}
          className="Sales__Daily--Buttons--Button"
          onChange={handleFirstDate}
        />
        <input
          type="date"
          name="SecondDate"
          id="SecondDate"
          value={secondDate}
          className="Sales__Daily--Buttons--Button"
          onChange={handleSecondDate}
        />
      </div>
      <section className="Sales__Daily--TableList">
        <header className="Sales__Daily--TableList--Header">
          <p className="Sales__Daily--TableList--Header--Number">Folio</p>
          <p className="Sales__Daily--TableList--Header--Product">Producto</p>
          <p className="Sales__Daily--TableList--Header--Total">Total</p>
          <p className="Sales__Daily--TableList--Header--Date">Fecha</p>
          <p className="Sales__Daily--TableList--Header--Ticket">Ticket</p>
        </header>
        {searchingSales ? (
          <Loader />
        ) : salesDaily.length > 0 ? (
          salesDaily.map(
            (
              { Folio, ImagenProducto, Cantidad, Nombre, Total, Fecha, Ticket },
              index
            ) => (
              <div className="Sales__Daily--TableList--Details" key={index}>
                <p className="Sales__Daily--TableList--Details--Number">
                  {Folio}
                </p>
                <span className="Sales__Daily--TableList--Details--Product">
                  <picture className="Sales__Daily--TableList--Details--Product--Picture">
                    <img
                      src={`${HOST_IMG}/${ImagenProducto}`}
                      alt="Imagen Representativa del Producto"
                    />
                  </picture>
                  <p>
                    x{Cantidad} - {Nombre}
                  </p>
                </span>
                <p className="Sales__Daily--TableList--Details--Total">
                  ${Total.toLocaleString()}
                </p>
                <p className="Sales__Daily--TableList--Details--Date">
                  {Fecha.substring(0, 10)}
                </p>
                <span className="Sales__Daily--TableList--Details--Ticket">
                  <a
                    className="Sales__Daily--TableList--Details--Ticket--Button"
                    href={`${HOST_PDF}/${Ticket}`}
                    target="_blank"
                  >
                    <ion-icon name="document-text-outline"></ion-icon>
                  </a>
                </span>
              </div>
            )
          )
        ) : (
          <NotResults> No hay ventas disponibles</NotResults>
        )}
      </section>
      {salesDaily?.length > 0 ? (
        <footer className="Sales__Daily--TableList--Footer">
          {report && (
            <a
              className="Sales__Daily--Buttons--Button"
              href={`${HOST_PDF}/${report}`}
              target="_blank"
            >
              Ver Reporte <ion-icon name="document-text-outline"></ion-icon>
            </a>
          )}
          <button
            className="Sales__Daily--Buttons--Button"
            onClick={handleGenerateReportPDF}
          >
            Imprimir <ion-icon name="print-outline"></ion-icon>
          </button>
        </footer>
      ) : null}
    </div>
  );
}
