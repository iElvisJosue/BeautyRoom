/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES
import ServiceDetails from "./ServiceDetails";
import Loader from "../components/Loader";

// IMPORTAMOS LOS HOOKS
import useGetServices from "../hooks/useGetServices";

// IMPORTAMOS LOS ESTILOS
import "../styles/SelectServices.css";

export default function SelectService({ setProgressDate, setDateInformation }) {
  const { services, searchingServices } = useGetServices();

  if (searchingServices) return <Loader />;

  return (
    <div className="SelectService__Container">
      <p className="SelectService__Title">Selecciona un tipo de servicio</p>
      {services.length > 0 && (
        <div className="SelectService__Details">
          {services.map(({ NombreServicio, ImagenServicio, idServicio }) => (
            <ServiceDetails
              key={idServicio}
              setProgressDate={setProgressDate}
              setDateInformation={setDateInformation}
              NombreServicio={NombreServicio}
              ImagenServicio={ImagenServicio}
              idServicio={idServicio}
            />
          ))}
        </div>
      )}
    </div>
  );
}
