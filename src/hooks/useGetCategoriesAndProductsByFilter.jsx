import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProducts } from "../context/ProductsContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetCategoriesAndProductsByFilter() {
  const { getCategoriesAndProductsByFilter } = useProducts();
  const [filter, setFilter] = useState(false);
  const [categoriesAndProductsByFilter, setCategoriesAndProductsByFilter] =
    useState(false);

  useEffect(() => {
    async function getAllCategoriesAndProductsByFilter() {
      try {
        const res = await getCategoriesAndProductsByFilter(filter);
        setCategoriesAndProductsByFilter(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getAllCategoriesAndProductsByFilter();
  }, [filter]);

  return {
    categoriesAndProductsByFilter,
    setFilter,
  };
}
