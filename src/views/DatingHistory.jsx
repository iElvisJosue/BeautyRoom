// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import FilterButton from "../components/FilterButton";
import Loader from "../components/Loader";
import NotResults from "../components/NotResults";
import DateInformation from "../components/DateInformation";

// IMPORTAMOS LAS AYUDAS
import { listOfServices } from "../helpers/ListServices";

// IMPORTAMOS LOS HOOKS
import useGetDates from "../hooks/useGetDates";

// IMPORTAMOS LOS ESTILOS
import "../styles/DatingHistory.css";

export default function DatingHistory() {
  const { totalDates, searchingDates } = useGetDates();

  if (searchingDates) return <Loader />;
  return (
    <main className="DatingHistory">
      <Navbar>Historial de Citas</Navbar>
      {totalDates.length > 0 ? (
        <div className="DatingHistory__Container">
          <h1 className="DatingHistory__Container--Title">
            Total de citas: {totalDates.length}
          </h1>
          <h1 className="DatingHistory__Container--SubTitle">Filtra por:</h1>
          <div className="DatingHistory__Container--Filters">
            {listOfServices.map((service, index) => (
              <FilterButton key={index} position={index}>
                {service}
              </FilterButton>
            ))}
          </div>
          <div className="DatingHistory__Container--Dates">
            {totalDates.map(
              ({ idCita, FechaCita, HoraCita, NombreCliente, ImagenCita }) => (
                <DateInformation
                  key={idCita}
                  FechaCita={FechaCita}
                  HoraCita={HoraCita}
                  NombreCliente={NombreCliente}
                  ImagenCita={ImagenCita}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <NotResults>
          ¡No se encontraron <br />
          citas registradas! <br />
          😔
        </NotResults>
      )}
    </main>
  );
}
