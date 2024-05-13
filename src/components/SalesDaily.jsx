// IMPORTAMOS LOS COMPONENTES
import Loader from "../components/Loader";
import NotResults from "../components/NotResults";

// IMPORTAMOS LOS HOOKS A USAR
import useGetSalesDaily from "../hooks/useGetSalesDaily";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG, HOST_PDF } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/SalesDaily.css";

export default function SalesDaily() {
  const { salesDaily, searchingSales, setDate } = useGetSalesDaily();

  const getSalesByDate = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  return (
    <div className="Sales__Daily">
      <div className="Sales__Daily--Buttons">
        <input
          type="date"
          name="SalesDate"
          id="SalesDate"
          className="Sales__Daily--Buttons--Button"
          onChange={getSalesByDate}
        />
        {salesDaily?.length > 0 ? (
          <button className="Sales__Daily--Buttons--Button">
            Imprimir <ion-icon name="print-outline"></ion-icon>
          </button>
        ) : null}
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
                  <img
                    src={`${HOST_IMG}/${ImagenProducto}`}
                    alt="Imagen Representativa del Producto"
                  />
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
    </div>
  );
}
