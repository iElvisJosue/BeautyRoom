import { useState } from "react";

export default function useDataDate() {
  const [currentDataDate, setCurrentDataDate] = useState(false);

  return {
    currentDataDate,
    setCurrentDataDate,
  };
}
