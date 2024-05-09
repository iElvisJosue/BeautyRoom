import { useState } from "react";

export default function useProgressPay() {
  const [progressPay, setProgressPay] = useState(0);

  return {
    progressPay,
    setProgressPay,
  };
}
