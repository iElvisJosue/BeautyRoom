/* eslint-disable react/prop-types */

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useServices } from "../context/ServicesContext";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/ServicesAndSubservices.css";

export default function ServicesAndSubservices({
  services,
  setCurrentId,
  setGoingToUpdate,
  setShowModalAdminSubservice,
  getServicesAndSubservicesAgain,
  setGetServicesAndSubservicesAgain,
  setShowModalAdminService,
}) {
  const { deleteSubservice } = useServices();

  const handleModalAddSubservice = (idServicio) => {
    setCurrentId(idServicio);
    setShowModalAdminSubservice(true);
  };

  const handleEditSubservice = (idSubservicio) => {
    setCurrentId(idSubservicio);
    setGoingToUpdate(true);
    setShowModalAdminSubservice(true);
  };

  const handleDeleteSubservice = async (idSubservicio) => {
    try {
      const res = await deleteSubservice(idSubservicio);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setGetServicesAndSubservicesAgain(!getServicesAndSubservicesAgain);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const handleService = (idServicio) => {
    setCurrentId(idServicio);
    setShowModalAdminService(true);
  };

  return (
    <section className="ServicesAndSubservices">
      {services.map(
        ({
          idServicio,
          NombreServicio,
          Subservicios,
          ImagenServicio,
          EstadoServicio,
        }) => (
          <>
            <div className={`ServicesAndSubservices__Title ${EstadoServicio}`}>
              <span className="ServicesAndSubservices__Title--Icon">
                <img
                  src={`${HOST_IMG}/${ImagenServicio}`}
                  alt={`Icono de ${NombreServicio}`}
                />
                <p>{`${NombreServicio} (${EstadoServicio.toUpperCase()})`}</p>
              </span>
              <button onClick={() => handleService(idServicio)}>
                <ion-icon name="brush-outline"></ion-icon>
              </button>
            </div>
            {Subservicios.map(
              (
                { NombreSubservicio, CostoSubservicio, idSubservicio },
                index
              ) => (
                <div className="ServicesAndSubservices__Details" key={index}>
                  <span className="ServicesAndSubservices__Details--Text">
                    <p>{NombreSubservicio}</p>
                    <p>${CostoSubservicio}</p>
                  </span>
                  <span className="ServicesAndSubservices__Details--Buttons">
                    <button onClick={() => handleEditSubservice(idSubservicio)}>
                      <ion-icon name="brush-outline"></ion-icon>
                    </button>
                    <button
                      onClick={() => handleDeleteSubservice(idSubservicio)}
                    >
                      <ion-icon name="trash-bin-outline"></ion-icon>
                    </button>
                  </span>
                </div>
              )
            )}
            <button
              className="ServicesAndSubservices__Button"
              onClick={() => handleModalAddSubservice(idServicio)}
            >
              Agregar Subservicio
            </button>
          </>
        )
      )}
    </section>
  );
}
