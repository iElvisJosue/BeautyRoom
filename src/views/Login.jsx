// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS ESTILOS
import "../styles/Login.css";

// IMPORTAMOS LAS AYUDAS
import { loginInputsProps } from "../helpers/Login";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS HOOKS
import usePassword from "../hooks/usePassword";

export default function Login() {
  const { loginUser } = useGlobal();
  const { iconPassword } = usePassword();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleSuccessResponse = (res) => {
    toast.success(
      `¡Tu sesión ha sido iniciada ${res.nombreUsuario.toUpperCase()}, bienvenido! 👋`
    );
    setTimeout(() => navigate("/Principal"), 1500);
  };

  const checkDataLogin = handleSubmit(async (data) => {
    try {
      const res = await loginUser(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        handleSuccessResponse(res);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  return (
    <main className="Login__Container">
      <form onSubmit={checkDataLogin} className="Login__Container__Form">
        <aside className="Login__Container__Form__Left">
          <img src="BeautyRoomLogo.png" alt="Icono De La Empresa" />
        </aside>
        <aside className="Login__Container__Form__Right">
          <h1 className="Login__Container__Form__Right__Tittle">
            Inicia Sesión
          </h1>
          {loginInputsProps.map(
            ({
              icon,
              inputType,
              inputName,
              messageError,
              placeholder,
              secondIcon = false,
            }) => (
              <>
                <div className="Login__Container__Form__Right--ContainerInputs">
                  <span className="Login__Container__Form__Right--ContainerInputs--Icon">
                    <ion-icon name={icon}></ion-icon>
                  </span>

                  {secondIcon && iconPassword}
                  {inputType === "text" ? (
                    <input
                      type={inputType}
                      {...register(inputName, { required: true })}
                      className="Login__Container__Form__Right--ContainerInputs--Inputs"
                      placeholder={placeholder}
                    />
                  ) : (
                    <input
                      type={inputType}
                      {...register(inputName, { required: true })}
                      className="Login__Container__Form__Right--ContainerInputs--Inputs"
                      placeholder={placeholder}
                      id="password"
                    />
                  )}
                </div>
                {errors[inputName] && (
                  <small className="Login__Container__Form__Right--SmallError">
                    {messageError}
                  </small>
                )}
              </>
            )
          )}
          {/* <a href="#" className="Login__Container__Form__Right--ForgotPassword">
            ¿Olvidaste tu contraseña?
          </a> */}
          <button
            type="submit"
            className="Login__Container__Form__Right--Button"
          >
            Iniciar Sesión
          </button>
          {/* <span className="Login__Container__Form__Right--CreateAccount">
            ¿No tienes una cuenta? <a href="#">Registrate</a>
          </span> */}
        </aside>
      </form>
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
