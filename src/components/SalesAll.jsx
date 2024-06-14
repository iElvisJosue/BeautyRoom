// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES
import NotResults from "../components/NotResults";
import TableSales from "../components/TableSales";
import Loader from "../components/Loader";

// IMPORTAMOS LOS HOOKS A USAR
import useGetSalesByFilter from "../hooks/useGetSalesByFilter";
import usePagination from "../hooks/usePagination";

// IMPORTAMOS LOS ESTILOS
import "../styles/SalesAll.css";

export default function SalesAll() {
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
  // const { salesByFilter, searchingSalesByFilter, setFilterSales } =
  const { salesByFilter, setFilterSales, searchingSalesByFilter } =
    useGetSalesByFilter();

  useEffect(() => {
    if (salesByFilter) {
      const cantidadDePaginas = Math.ceil(
        salesByFilter.length / amountRegisters
      );
      setAmountPages(cantidadDePaginas);
    }
  }, [salesByFilter]);

  const getSalesByFilter = (event) => {
    const value = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(value)) {
      const filter = event.target.value;
      setFilterSales(filter);
      resetValues();
    }
  };

  if (searchingSalesByFilter) return <Loader />;

  return (
    <div className="Sales__All">
      <h1 className="Sales__All--SubTitle">Buscar venta:</h1>
      <input
        type="text"
        placeholder="Fecha (AAAA-MM-DD), Folio, Producto, Empleado, Cliente"
        className="Sales__All--Input"
        onChange={getSalesByFilter}
      />
      <div className="Sales__All--Buttons--Pages">
        {startIndex >= amountRegisters && (
          <button
            className="Sales__All--TableList--Buttons--Pages--Button Prev"
            onClick={handleShowTwentyFiveLess}
          >
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
        )}
        {endIndex < salesByFilter.length && (
          <button
            className="Sales__All--TableList--Buttons--Pages--Button Next"
            onClick={handleShowTwentyFiveMore}
          >
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        )}
      </div>
      {salesByFilter.length > 0 ? (
        <>
          <TableSales
            salesList={salesByFilter}
            startIndex={startIndex}
            endIndex={endIndex}
            page={page}
            amountPages={amountPages}
          />
          <p className="Sales__All--TableList--Pages">
            ({page}/{amountPages})
          </p>
        </>
      ) : (
        <NotResults>¡No se encontraron resultados!</NotResults>
      )}
    </div>
  );
}
