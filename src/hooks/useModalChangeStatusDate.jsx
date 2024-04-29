import { useState } from "react";

export default function useModalChangeStatusDate() {
  const [showModalChangeStatusDate, setShowModalChangeStatusDate] =
    useState(false);
  const [textModalChangeStatusDate, setTextModalChangeStatusDate] =
    useState("INDEFINIDO");

  return {
    showModalChangeStatusDate,
    setShowModalChangeStatusDate,
    textModalChangeStatusDate,
    setTextModalChangeStatusDate,
  };
}
