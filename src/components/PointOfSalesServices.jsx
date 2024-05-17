/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Loader from "./Loader";
import NotResults from "./NotResults";
import PointOfSalesServicesFilters from "./PointOfSalesServicesFilters";
import PointOfSalesServicesList from "./PointOfSalesServicesList";

// IMPORTAMOS LOS HOOKS A USAR
import useGetServicesAndSubservices from "../hooks/useGetServicesAndSubservices";
import useGetServicesAndSubservicesByFilter from "../hooks/useGetServicesAndSubservicesByFilter";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesServices.css";

export default function PointOfSalesServices({
  cart,
  setCart,
  getCartAgain,
  setGetCartAgain,
  showCart,
  setShowCart,
}) {
  const [useFilter, setUseFilter] = useState(false);
  const {
    services,
    searchingServices,
    setGetServicesAndSubservicesAgain,
    getServicesAndSubservicesAgain,
  } = useGetServicesAndSubservices();
  const { servicesAndSubservicesByFilter, setFilter } =
    useGetServicesAndSubservicesByFilter();

  if (searchingServices) return <Loader />;

  setTimeout(() => {
    setGetServicesAndSubservicesAgain(!getServicesAndSubservicesAgain);
  }, 5000);

  // FILTRAMOS LAS CATEGORÍAS QUE NO TENGAN PRODUCTOS Y SEAN ACTIVAS
  const servicesWithSubservices = services.filter(
    (Servicios) =>
      Servicios.Subservicios.length > 0 && Servicios.EstadoServicio === "Activo"
  );

  const pointOfSalesServicesProps = {
    cart,
    setCart,
    getCartAgain,
    setGetCartAgain,
    showCart,
    setShowCart,
  };

  return (
    <div className="PointOfSalesServices">
      {services.length > 0 ? (
        <>
          <p className="PointOfSalesServices__Title">
            Filtrar por <ion-icon name="eye-outline"></ion-icon>
          </p>
          <div className="PointOfSalesServices__Container">
            <PointOfSalesServicesFilters
              setFilter={setFilter}
              setUseFilter={setUseFilter}
              Content={servicesWithSubservices}
            />
            {useFilter ? (
              <PointOfSalesServicesList
                Content={servicesAndSubservicesByFilter}
                {...pointOfSalesServicesProps}
              />
            ) : (
              <PointOfSalesServicesList
                Content={servicesWithSubservices}
                {...pointOfSalesServicesProps}
              />
            )}
          </div>
        </>
      ) : (
        <NotResults> No hay servicios disponibles</NotResults>
      )}
    </div>
  );
}
