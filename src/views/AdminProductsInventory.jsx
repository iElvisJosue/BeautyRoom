// LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import Loader from "../components/Loader";
import AdminCategoryProductsList from "../components/AdminCategoryProductsList";
import AdminAddCategory from "../components/AdminAddCategory";
import AdminAddProduct from "../components/AdminAddProduct";
import AdminEditProduct from "../components/AdminEditProduct";
import ModalDeleteProduct from "../components/ModalDeleteProduct";
import ModalEditCategory from "../components/ModalEditCategory";

// IMPORTAMOS LOS HOOKS A USAR
import useSubMenu from "../hooks/useSubMenu";
import useGetCategoriesAndProducts from "../hooks/useGetCategoriesAndProducts";
import useModalDeleteProduct from "../hooks/useModalDeleteProduct";
import useModalEditCategory from "../hooks/useModalEditCategory";

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
  const { showModalEditCategory, setShowModalEditCategory } =
    useModalEditCategory();

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
    showModalEditCategory,
    setShowModalEditCategory,
  };

  const currentViewAdminProductsInventory = {
    0: AdminCategoryProductsList,
    1: AdminAddCategory,
    2: AdminAddProduct,
    3: AdminEditProduct,
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
      {showModalEditCategory && (
        <ModalEditCategory {...productsInventoryProps} />
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
