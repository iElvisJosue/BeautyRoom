import { useState } from "react";

export default function useSubMenu() {
  const [optionSubMenu, setOptionSubMenu] = useState(0);
  return {
    optionSubMenu,
    setOptionSubMenu,
  };
}
