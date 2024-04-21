import { useState } from "react";

export default function useModalPay() {
  const [showModalPay, setShowModalPay] = useState(false);

  return {
    showModalPay,
    setShowModalPay,
  };
}
