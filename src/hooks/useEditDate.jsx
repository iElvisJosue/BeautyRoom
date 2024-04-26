import { useState } from "react";

export default function useEditDate() {
  const [showEditDate, setShowEditDate] = useState(false);

  return {
    showEditDate,
    setShowEditDate,
  };
}
