import { useState } from "react";

export default function useModalDeleteInternal() {
  const [showModalDeleteInternal, setShowModalDeleteInternal] = useState(false);

  return {
    showModalDeleteInternal,
    setShowModalDeleteInternal,
  };
}
