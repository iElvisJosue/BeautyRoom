/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Loader from "./Loader";
import PointOfSalesProductsFilters from "./PointOfSalesProductsFilters";
import PointOfSalesProductsList from "./PointOfSalesProductsList";

// IMPORTAMOS LOS HOOKS A USAR
import useGetCategoriesAndProducts from "../hooks/useGetCategoriesAndProducts";
import useGetCategoriesAndProductsByFilter from "../hooks/useGetCategoriesAndProductsByFilter";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesProducts.css";

export default function PointOfSalesProducts({
  cart,
  setCart,
  getCartAgain,
  setGetCartAgain,
  showCart,
  setShowCart,
}) {
  const [useFilter, setUseFilter] = useState(false);
  const {
    categoriesAndProducts,
    searchingCategoriesAndProducts,
    setGetCategoriesAndProductsAgain,
    getCategoriesAndProductsAgain,
  } = useGetCategoriesAndProducts();
  const { categoriesAndProductsByFilter, setFilter } =
    useGetCategoriesAndProductsByFilter();

  if (searchingCategoriesAndProducts) return <Loader />;

  setTimeout(() => {
    setGetCategoriesAndProductsAgain(!getCategoriesAndProductsAgain);
  }, 5000);

  // FILTRAMOS LAS CATEGORÍAS QUE NO TENGAN PRODUCTOS
  const categoriesWithProducts = categoriesAndProducts.filter(
    ({ Productos }) => Productos.length > 0
  );
  const pointOfSalesProductsProps = {
    cart,
    setCart,
    getCartAgain,
    setGetCartAgain,
    showCart,
    setShowCart,
  };

  return (
    <div className="PointOfSalesProducts">
      <p className="PointOfSalesProducts__Title">
        Filtrar por <ion-icon name="eye-outline"></ion-icon>
      </p>
      <div className="PointOfSalesProducts__Container">
        <PointOfSalesProductsFilters
          setFilter={setFilter}
          setUseFilter={setUseFilter}
          Content={categoriesWithProducts}
        />
        {useFilter ? (
          <PointOfSalesProductsList
            Content={categoriesAndProductsByFilter}
            {...pointOfSalesProductsProps}
          />
        ) : (
          <PointOfSalesProductsList
            Content={categoriesWithProducts}
            {...pointOfSalesProductsProps}
          />
        )}
      </div>
    </div>
  );
}
