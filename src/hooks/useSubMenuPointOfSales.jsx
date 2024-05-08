import { useState } from "react";

export default function useSubMenuPointOfSales() {
  const [optionSubMenuPointOfSales, setOptionSubMenuPointOfSales] = useState(0);
  return {
    optionSubMenuPointOfSales,
    setOptionSubMenuPointOfSales,
  };
}
