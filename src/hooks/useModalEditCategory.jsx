import { useState } from "react";

export default function useModalEditCategory() {
  const [showModalEditCategory, setShowModalEditCategory] = useState(false);

  return {
    showModalEditCategory,
    setShowModalEditCategory,
  };
}
