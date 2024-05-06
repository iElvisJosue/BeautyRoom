import { useState } from "react";

export default function useModalEditCategoryInternal() {
  const [showModalEditCategoryInternal, setShowModalEditCategoryInternal] =
    useState(false);

  return {
    showModalEditCategoryInternal,
    setShowModalEditCategoryInternal,
  };
}
