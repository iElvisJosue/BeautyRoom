import { useState } from "react";

export default function useModalAdminSubservice() {
  const [showModalAdminSubservice, setShowModalAdminSubservice] =
    useState(false);

  return {
    showModalAdminSubservice,
    setShowModalAdminSubservice,
  };
}
