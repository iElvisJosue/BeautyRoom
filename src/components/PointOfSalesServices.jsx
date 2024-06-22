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
  employeesExist,
}) {
  const [useFilter, setUseFilter] = useState(false);
  const {
    services,
    searchingServices,
    setGetServicesAndSubservicesAgain,
    getServicesAndSubservicesAgain,
  } = useGetServicesAndSubservices();
  const {
    servicesAndSubservicesByFilter,
    setFilter,
    setGetServicesAndSubservicesByFilterAgain,
    getServicesAndSubservicesByFilterAgain,
  } = useGetServicesAndSubservicesByFilter();

  if (searchingServices) return <Loader />;

  setTimeout(() => {
    setGetServicesAndSubservicesAgain(!getServicesAndSubservicesAgain);
    setGetServicesAndSubservicesByFilterAgain(
      !getServicesAndSubservicesByFilterAgain
    );
  }, 5000);

  const pointOfSalesServicesProps = {
    cart,
    setCart,
    getCartAgain,
    setGetCartAgain,
    showCart,
    setShowCart,
    employeesExist,
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
              Content={services}
            />
            {useFilter ? (
              <PointOfSalesServicesList
                Content={servicesAndSubservicesByFilter}
                {...pointOfSalesServicesProps}
              />
            ) : (
              <PointOfSalesServicesList
                Content={services}
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
