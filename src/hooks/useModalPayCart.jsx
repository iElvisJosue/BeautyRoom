import { useState } from "react";

export default function useModalPayCart() {
  const [showModalPayCart, setShowModalPayCart] = useState(false);

  return {
    showModalPayCart,
    setShowModalPayCart,
  };
}
