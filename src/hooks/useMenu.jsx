import { useState } from "react";

export default function useMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return {
    showMenu,
    setShowMenu,
  };
}
