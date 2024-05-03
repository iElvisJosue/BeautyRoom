import { useState } from "react";

export default function useModalDeleteProduct() {
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);

  return {
    showModalDeleteProduct,
    setShowModalDeleteProduct,
  };
}
