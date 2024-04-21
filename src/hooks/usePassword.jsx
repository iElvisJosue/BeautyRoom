import { useState } from "react";

export default function usePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const iconInputPassword = showPassword ? "eye-off-outline" : "eye-outline";

  const changeInputPassword = () => {
    setShowPassword(!showPassword);
    const inputPassword = document.querySelector("#password");
    inputPassword.type = showPassword ? "password" : "text";
  };

  const iconPassword = (
    <span
      className="Login__Container__Form__Right--ContainerInputs--Icon Eye"
      onClick={changeInputPassword}
    >
      <ion-icon name={iconInputPassword}></ion-icon>
    </span>
  );

  return {
    iconPassword,
  };
}
