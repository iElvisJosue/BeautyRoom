// IMPORTAMOS LOS COMPONENTES
import Loader from "../components/Loader";
import NotResults from "../components/NotResults";

// IMPORTAMOS LOS HOOKS A USAR
import useGetSalesByFilter from "../hooks/useGetSalesByFilter";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG, HOST_PDF } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/SalesAll.css";

export default function SalesAll() {
  const { salesByFilter, searchingSalesByFilter, setFilterSales } =
    useGetSalesByFilter();

  const getSalesByFilter = (event) => {
    const value = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(value)) {
      const filter = event.target.value;
      setFilterSales(filter);
    }
  };
  return (
    <div className="Sales__All">
      <h1 className="Sales__All--SubTitle">Buscar venta:</h1>
      <input
        type="text"
        placeholder="Fecha (AAAA-MM-DD), Folio, Producto, Empleado, Metodo de Pago o Cliente"
        className="Sales__All--Input"
        onChange={getSalesByFilter}
      />
      <section className="Sales__All--TableList">
        <header className="Sales__All--TableList--Header">
          <p className="Sales__All--TableList--Header--Number">Folio</p>
          <p className="Sales__All--TableList--Header--Product">Producto</p>
          <p className="Sales__All--TableList--Header--Total">Total</p>
          <p className="Sales__All--TableList--Header--Date">Fecha</p>
          <p className="Sales__All--TableList--Header--Ticket">Ticket</p>
        </header>
        {searchingSalesByFilter ? (
          <Loader />
        ) : salesByFilter.length > 0 ? (
          salesByFilter.map(
            (
              { Folio, ImagenProducto, Cantidad, Nombre, Total, Fecha, Ticket },
              index
            ) => (
              <div className="Sales__All--TableList--Details" key={index}>
                <p className="Sales__All--TableList--Details--Number">
                  {Folio}
                </p>
                <span className="Sales__All--TableList--Details--Product">
                  <picture className="Sales__All--TableList--Details--Product--Picture">
                    <img
                      src={`${HOST_IMG}/${ImagenProducto}`}
                      alt="Imagen Representativa del Producto"
                    />
                  </picture>
                  <p>
                    x{Cantidad} - {Nombre}
                  </p>
                </span>
                <p className="Sales__All--TableList--Details--Total">
                  ${Total.toLocaleString()}
                </p>
                <p className="Sales__All--TableList--Details--Date">
                  {Fecha.substring(0, 10)}
                </p>
                <span className="Sales__All--TableList--Details--Ticket">
                  <a
                    className="Sales__All--TableList--Details--Ticket--Button"
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
