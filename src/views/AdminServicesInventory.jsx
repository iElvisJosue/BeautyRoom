// LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import Loader from "../components/Loader";
import AddService from "../components/AddService";
import ServicesAndSubservices from "../components/ServicesAndSubservices";
import ModalAdminSubservice from "../components/ModalAdminSubservice";
import ModalAdminService from "../components/ModalAdminService";

// IMPORTAMOS LOS HOOKS A USAR
import useSubMenu from "../hooks/useSubMenu";
import useGetServicesAndSubservices from "../hooks/useGetServicesAndSubservices";
import useModalAdminSubservice from "../hooks/useModalAdminSubservice";
import useModalAdminService from "../hooks/useModalAdminService";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminServicesInventory.css";

export default function AdminServicesInventory() {
  const {
    services,
    searchingServices,
    getServicesAndSubservicesAgain,
    setGetServicesAndSubservicesAgain,
  } = useGetServicesAndSubservices();
  const [currentId, setCurrentId] = useState(null);
  const [goingToUpdate, setGoingToUpdate] = useState(false);
  const { showModalAdminSubservice, setShowModalAdminSubservice } =
    useModalAdminSubservice();
  const { showModalAdminService, setShowModalAdminService } =
    useModalAdminService();
  const { optionSubMenu, setOptionSubMenu } = useSubMenu();

  if (searchingServices) return <Loader />;

  return (
    <main className="AdminServicesInventory">
      <Navbar>Inventario de Servicios</Navbar>
      <div className="AdminServicesInventory__Container">
        <SubMenu
          NombreOpciónUno="Inventario General"
          NombreOpciónDos="Agregar Servicio"
          setOptionSubMenu={setOptionSubMenu}
          optionSubMenu={optionSubMenu}
        />
        <ModalAdminSubservice
          services={services}
          currentId={currentId}
          setGoingToUpdate={setGoingToUpdate}
          goingToUpdate={goingToUpdate}
          showModalAdminSubservice={showModalAdminSubservice}
          setShowModalAdminSubservice={setShowModalAdminSubservice}
          getServicesAndSubservicesAgain={getServicesAndSubservicesAgain}
          setGetServicesAndSubservicesAgain={setGetServicesAndSubservicesAgain}
        />
        <ModalAdminService
          services={services}
          currentId={currentId}
          showModalAdminService={showModalAdminService}
          setShowModalAdminService={setShowModalAdminService}
          getServicesAndSubservicesAgain={getServicesAndSubservicesAgain}
          setGetServicesAndSubservicesAgain={setGetServicesAndSubservicesAgain}
        />
        {optionSubMenu === 0 ? (
          <ServicesAndSubservices
            services={services}
            setCurrentId={setCurrentId}
            setGoingToUpdate={setGoingToUpdate}
            setShowModalAdminSubservice={setShowModalAdminSubservice}
            getServicesAndSubservicesAgain={getServicesAndSubservicesAgain}
            setGetServicesAndSubservicesAgain={
              setGetServicesAndSubservicesAgain
            }
            setShowModalAdminService={setShowModalAdminService}
          />
        ) : (
          <AddService
            setOptionSubMenu={setOptionSubMenu}
            setGetServicesAndSubservicesAgain={
              setGetServicesAndSubservicesAgain
            }
            getServicesAndSubservicesAgain={getServicesAndSubservicesAgain}
          />
        )}
      </div>
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
