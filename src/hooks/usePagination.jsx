// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

export default function usePagination() {
  const amountRegisters = 10;
  const [page, setPage] = useState(1);
  const [amountPages, setAmountPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(amountRegisters);

  const handleShowTwentyFiveMore = () => {
    setStartIndex(startIndex + amountRegisters);
    setEndIndex(endIndex + amountRegisters);
    setPage(page + 1);
  };

  const handleShowTwentyFiveLess = () => {
    setStartIndex(startIndex - amountRegisters);
    setEndIndex(endIndex - amountRegisters);
    setPage(page - 1);
  };

  const resetValues = () => {
    setStartIndex(0);
    setEndIndex(amountRegisters);
    setPage(1);
  };

  return {
    amountRegisters,
    page,
    startIndex,
    endIndex,
    amountPages,
    setAmountPages,
    handleShowTwentyFiveMore,
    handleShowTwentyFiveLess,
    resetValues,
  };
}
