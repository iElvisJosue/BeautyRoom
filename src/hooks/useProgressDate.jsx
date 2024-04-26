import { useState } from "react";

export default function useProgressDate() {
  const [progressDate, setProgressDate] = useState(0);

  return {
    progressDate,
    setProgressDate,
  };
}
