// LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import Loader from "../components/Loader";
import AdminCategoryInternalList from "../components/AdminCategoryInternalList";
import AdminAddCategoryInternal from "../components/AdminAddCategoryInternal";
import AdminAddInternal from "../components/AdminAddInternal";
import AdminEditInternal from "../components/AdminEditInternal";
import ModalDeleteInternal from "../components/ModalDeleteInternal";
import ModalEditCategoryInternal from "../components/ModalEditCategoryInternal";

// IMPORTAMOS LOS HOOKS A USAR
import useSubMenu from "../hooks/useSubMenu";
import useGetCategoriesAndInternal from "../hooks/useGetCategoriesAndInternal";
import useModalDeleteInternal from "../hooks/useModalDeleteInternal";
import useModalEditCategoryInternal from "../hooks/useModalEditCategoryInternal";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminInternalInventory.css";

export default function AdminInternalInventory() {
  const {
    categoriesAndInternal,
    searchingCategoriesAndInternal,
    getCategoriesAndInternalAgain,
    setGetCategoriesAndInternalAgain,
  } = useGetCategoriesAndInternal();
  const { optionSubMenu, setOptionSubMenu } = useSubMenu();
  const [currentId, setCurrentId] = useState(null);
  const { showModalEditCategoryInternal, setShowModalEditCategoryInternal } =
    useModalEditCategoryInternal();
  const { showModalDeleteInternal, setShowModalDeleteInternal } =
    useModalDeleteInternal();

  const internalInventoryProps = {
    optionSubMenu,
    setOptionSubMenu,
    categoriesAndInternal,
    getCategoriesAndInternalAgain,
    setGetCategoriesAndInternalAgain,
    currentId,
    setCurrentId,
    showModalDeleteInternal,
    setShowModalDeleteInternal,
    showModalEditCategoryInternal,
    setShowModalEditCategoryInternal,
  };

  const currentViewAdminInternalInventory = {
    0: AdminCategoryInternalList,
    1: AdminAddCategoryInternal,
    2: AdminAddInternal,
    3: AdminEditInternal,
  };

  const OptionAdminInternalInventory =
    currentViewAdminInternalInventory[optionSubMenu];

  if (searchingCategoriesAndInternal) return <Loader />;

  return (
    <main className="AdminInternalInventory">
      <Navbar>Inventario Interno</Navbar>
      {showModalDeleteInternal && (
        <ModalDeleteInternal {...internalInventoryProps} />
      )}
      {showModalEditCategoryInternal && (
        <ModalEditCategoryInternal {...internalInventoryProps} />
      )}
      <div className="AdminProductsInventory__Container">
        <SubMenu
          NombreOpciónUno="Inventario General"
          NombreOpciónDos="Agregar Categoría"
          setOptionSubMenu={setOptionSubMenu}
          optionSubMenu={optionSubMenu}
        />
        <OptionAdminInternalInventory {...internalInventoryProps} />
      </div>
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
