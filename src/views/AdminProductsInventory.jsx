// LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import Loader from "../components/Loader";
import AdminAddCategory from "../components/AdminAddCategory";
import AdminCategoryProductsList from "../components/AdminCategoryProductsList";
import AdminAddProduct from "../components/AdminAddProduct";
import ModalDeleteProduct from "../components/ModalDeleteProduct";

// IMPORTAMOS LOS HOOKS A USAR
import useSubMenu from "../hooks/useSubMenu";
import useGetCategoriesAndProducts from "../hooks/useGetCategoriesAndProducts";
import useModalDeleteProduct from "../hooks/useModalDeleteProduct";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminProductsInventory.css";

export default function AdminProductsInventory() {
  const {
    categoriesAndProducts,
    searchingCategories,
    getCategoriesAndProductsAgain,
    setGetCategoriesAndProductsAgain,
  } = useGetCategoriesAndProducts();
  const { optionSubMenu, setOptionSubMenu } = useSubMenu();
  const [currentId, setCurrentId] = useState(null);
  const { showModalDeleteProduct, setShowModalDeleteProduct } =
    useModalDeleteProduct();
  // const [goingToUpdate, setGoingToUpdate] = useState(false);

  const productsInventoryProps = {
    categoriesAndProducts,
    optionSubMenu,
    setOptionSubMenu,
    currentId,
    setCurrentId,
    getCategoriesAndProductsAgain,
    setGetCategoriesAndProductsAgain,
    showModalDeleteProduct,
    setShowModalDeleteProduct,
  };

  const currentViewAdminProductsInventory = {
    0: AdminCategoryProductsList,
    1: AdminAddCategory,
    2: AdminAddProduct,
  };

  const OptionAdminProductsInventory =
    currentViewAdminProductsInventory[optionSubMenu];

  if (searchingCategories) return <Loader />;

  return (
    <main className="AdminProductsInventory">
      <Navbar>Inventario de Productos</Navbar>
      {showModalDeleteProduct && (
        <ModalDeleteProduct {...productsInventoryProps} />
      )}
      <div className="AdminProductsInventory__Container">
        <SubMenu
          NombreOpciónUno="Inventario General"
          NombreOpciónDos="Agregar Categoría"
          setOptionSubMenu={setOptionSubMenu}
          optionSubMenu={optionSubMenu}
        />
        <OptionAdminProductsInventory {...productsInventoryProps} />
      </div>
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
