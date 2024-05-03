import { useState } from "react";

export default function useModalAdminService() {
  const [showModalAdminService, setShowModalAdminService] = useState(false);

  return {
    showModalAdminService,
    setShowModalAdminService,
  };
}
