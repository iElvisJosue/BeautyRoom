/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES
import SubserviceDetails from "./SubserviceDetails";
import Loader from "../components/Loader";

// IMPORTAMOS LOS HOOKS
import useGetSubservices from "../hooks/useGetSubservices";

// IMPORTAMOS LOS ESTILOS
import "../styles/SelectSubservice.css";

export default function SelectSubservice({
  dateInformation,
  setProgressDate,
  setDateInformation,
}) {
  const { idServicio } = dateInformation;
  const { subservices, searchingSubservices } = useGetSubservices({
    idServicio,
  });

  if (searchingSubservices) return <Loader />;

  return (
    <div className="SelectSubservice__Container">
      <p className="SelectSubservice__Title">Selecciona el subservicio</p>
      {subservices.length > 0 && (
        <div className="SelectSubservice__Details">
          {subservices.map(
            ({ NombreSubservicio, CostoSubservicio, idSubservicio }) => (
              <SubserviceDetails
                key={idSubservicio}
                setProgressDate={setProgressDate}
                dateInformation={dateInformation}
                setDateInformation={setDateInformation}
                NombreSubservicio={NombreSubservicio}
                CostoSubservicio={CostoSubservicio}
                idSubservicio={idSubservicio}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
