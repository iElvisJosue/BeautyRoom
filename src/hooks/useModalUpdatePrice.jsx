import { useState } from "react";

export default function useModalUpdatePrice() {
  const [showModalUpdatePrice, setShowModalUpdatePrice] = useState(false);

  return {
    showModalUpdatePrice,
    setShowModalUpdatePrice,
  };
}
