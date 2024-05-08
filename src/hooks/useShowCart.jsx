import { useState } from "react";

export default function useShowCart() {
  const [showCart, setShowCart] = useState(false);

  return {
    showCart,
    setShowCart,
  };
}
