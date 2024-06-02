// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES
import NotResults from "../components/NotResults";
import TableSales from "../components/TableSales";

// IMPORTAMOS LOS HOOKS A USAR
import useGetSalesByFilter from "../hooks/useGetSalesByFilter";

// IMPORTAMOS LOS ESTILOS
import "../styles/SalesAll.css";

export default function SalesAll() {
  const amountSales = 25;
  const [page, setPage] = useState(1);
  const [amountPages, setAmountPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(amountSales);
  // const { salesByFilter, searchingSalesByFilter, setFilterSales } =
  const { salesByFilter, setFilterSales } = useGetSalesByFilter();

  useEffect(() => {
    if (salesByFilter) {
      const cantidadDePaginas = Math.ceil(salesByFilter.length / amountSales);
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

  const handleShowTwentyFiveMore = () => {
    setStartIndex(startIndex + amountSales);
    setEndIndex(endIndex + amountSales);
    setPage(page + 1);
  };

  const handleShowTwentyFiveLess = () => {
    setStartIndex(startIndex - amountSales);
    setEndIndex(endIndex - amountSales);
    setPage(page - 1);
  };

  const resetValues = () => {
    setStartIndex(0);
    setEndIndex(amountSales);
    setPage(1);
  };

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
        {startIndex >= amountSales && (
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
// // IMPORTAMOS LAS LIBRERÍAS A USAR
// import { useState, useEffect } from "react";

// // IMPORTAMOS LOS COMPONENTES
// import Loader from "../components/Loader";
// import NotResults from "../components/NotResults";

// // IMPORTAMOS LOS HOOKS A USAR
// import useGetSalesByFilter from "../hooks/useGetSalesByFilter";

// // IMPORTAMOS LAS AYUDAS
// import { HOST_IMG, HOST_PDF } from "../helpers/Urls";

// // IMPORTAMOS LOS ESTILOS
// import "../styles/SalesAll.css";

// export default function SalesAll() {
//   const amountSales = 25;
//   const [page, setPage] = useState(1);
//   const [amountPages, setAmountPages] = useState(1);
//   const [startIndex, setStartIndex] = useState(0);
//   const [endIndex, setEndIndex] = useState(amountSales);
//   const { salesByFilter, searchingSalesByFilter, setFilterSales } =
//     useGetSalesByFilter();

//   useEffect(() => {
//     if (salesByFilter) {
//       const cantidadDePaginas = Math.ceil(salesByFilter.length / amountSales);
//       setAmountPages(cantidadDePaginas);
//     }
//   }, [salesByFilter]);

//   const getSalesByFilter = (event) => {
//     const value = event.target.value;
//     // Utilizamos una expresión regular para permitir letras, números y "-"
//     const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
//     // Comprobamos si el nuevo valor cumple con la expresión regular
//     if (regex.test(value)) {
//       setStartIndex(0);
//       setEndIndex(amountSales);
//       const filter = event.target.value;
//       setFilterSales(filter);
//     }
//   };

//   const handleShowTwentyFiveMore = () => {
//     setStartIndex(startIndex + amountSales);
//     setEndIndex(endIndex + amountSales);
//     setPage(page + 1);
//   };

//   const handleShowTwentyFiveLess = () => {
//     setStartIndex(startIndex - amountSales);
//     setEndIndex(endIndex - amountSales);
//     setPage(page - 1);
//   };

//   return (
//     <div className="Sales__All">
//       <h1 className="Sales__All--SubTitle">Buscar venta:</h1>
//       <input
//         type="text"
//         placeholder="Fecha (AAAA-MM-DD), Folio, Producto, Empleado, Metodo de Pago o Cliente"
//         className="Sales__All--Input"
//         onChange={getSalesByFilter}
//       />
//       <div className="Sales__All--Buttons--Pages">
//         {startIndex >= amountSales && (
//           <button
//             className="Sales__All--TableList--Buttons--Pages--Button Prev"
//             onClick={handleShowTwentyFiveLess}
//           >
//             <ion-icon name="arrow-back-outline"></ion-icon>
//           </button>
//         )}
//         {endIndex < salesByFilter.length && (
//           <button
//             className="Sales__All--TableList--Buttons--Pages--Button Next"
//             onClick={handleShowTwentyFiveMore}
//           >
//             <ion-icon name="arrow-forward-outline"></ion-icon>
//           </button>
//         )}
//       </div>
//       <section className="Sales__All--TableList">
//         <header className="Sales__All--TableList--Header">
//           <p className="Sales__All--TableList--Header--Number">Folio</p>
//           <p className="Sales__All--TableList--Header--Product">Producto</p>
//           <p className="Sales__All--TableList--Header--Total">Total</p>
//           <p className="Sales__All--TableList--Header--Date">Fecha</p>
//           <p className="Sales__All--TableList--Header--Ticket">Ticket</p>
//         </header>
//         {searchingSalesByFilter ? (
//           <Loader />
//         ) : salesByFilter.length > 0 ? (
//           salesByFilter
//             .slice(startIndex, endIndex)
//             .map(
//               (
//                 {
//                   Folio,
//                   ImagenProducto,
//                   Cantidad,
//                   Nombre,
//                   TotalProducto,
//                   FechaVenta,
//                   Ticket,
//                 },
//                 index
//               ) => (
//                 <div className="Sales__All--TableList--Details" key={index}>
//                   <p className="Sales__All--TableList--Details--Number">
//                     {Folio}
//                   </p>
//                   <span className="Sales__All--TableList--Details--Product">
//                     <picture className="Sales__All--TableList--Details--Product--Picture">
//                       <img
//                         src={`${HOST_IMG}/${ImagenProducto}`}
//                         alt="Imagen Representativa del Producto"
//                       />
//                     </picture>
//                     <p>
//                       x{Cantidad} - {Nombre}
//                     </p>
//                   </span>
//                   <p className="Sales__All--TableList--Details--Total">
//                     ${TotalProducto.toLocaleString()}
//                   </p>
//                   <p className="Sales__All--TableList--Details--Date">
//                     {FechaVenta.substring(0, 10)}
//                   </p>
//                   <span className="Sales__All--TableList--Details--Ticket">
//                     <a
//                       className="Sales__All--TableList--Details--Ticket--Button"
//                       href={`${HOST_PDF}/${Ticket}`}
//                       target="_blank"
//                     >
//                       <ion-icon name="document-text-outline"></ion-icon>
//                     </a>
//                   </span>
//                 </div>
//               )
//             )
//         ) : (
//           <NotResults> No hay ventas disponibles</NotResults>
//         )}
//       </section>
//       <p className="Sales__All--TableList--Pages">
//         ({page}/{amountPages})
//       </p>
//     </div>
//   );
// }
