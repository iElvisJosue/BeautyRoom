import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProducts } from "../context/ProductsContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetCategoriesAndProducts() {
  const { getCategoriesAndProducts } = useProducts();
  const [categoriesAndProducts, setCategoriesAndProducts] = useState(false);
  const [searchingCategoriesAndProducts, setSearchingCategoriesAndProducts] =
    useState(true);
  const [getCategoriesAndProductsAgain, setGetCategoriesAndProductsAgain] =
    useState(false);

  useEffect(() => {
    async function getAllCategoriesAndProducts() {
      try {
        const res = await getCategoriesAndProducts();
        setCategoriesAndProducts(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingCategoriesAndProducts(false);
    }
    getAllCategoriesAndProducts();
  }, [getCategoriesAndProductsAgain]);

  return {
    categoriesAndProducts,
    searchingCategoriesAndProducts,
    getCategoriesAndProductsAgain,
    setGetCategoriesAndProductsAgain,
  };
}
