import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInternal } from "../context/InternalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function useGetCategoriesAndInternal() {
  const { getCategoriesAndInternal } = useInternal();
  const [categoriesAndInternal, setCategoriesAndInternal] = useState(false);
  const [searchingCategoriesAndInternal, setSearchingCategoriesAndInternal] =
    useState(true);
  const [getCategoriesAndInternalAgain, setGetCategoriesAndInternalAgain] =
    useState(false);

  useEffect(() => {
    async function getAllCategoriesAndInternal() {
      try {
        const res = await getCategoriesAndInternal();
        setCategoriesAndInternal(res.data);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
      setSearchingCategoriesAndInternal(false);
    }
    getAllCategoriesAndInternal();
  }, [getCategoriesAndInternalAgain]);

  return {
    categoriesAndInternal,
    searchingCategoriesAndInternal,
    getCategoriesAndInternalAgain,
    setGetCategoriesAndInternalAgain,
  };
}
