// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Toaster, toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { dataUsersInputsProps } from "../helpers/DataUsers";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS HOOKS
import useMenu from "../hooks/useMenu";
// import usePassword from "../hooks/usePassword";

// IMPORTAMOS LOS ESTILOS
import "../styles/AddUsers.css";

export default function AddUsers() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const { verifyUserExist, createNewUser } = useGlobal();
  const { showMenu, setShowMenu } = useMenu();
  //   const { iconPassword } = usePassword();

  const verifyUserDuplicateExist = handleSubmit(async (data) => {
    try {
      const res = await verifyUserExist(data);
      if (res.data.length > 0) {
        return toast.error(
          "Ya existe un usuario con este nombre, por favor ingresa otro ❌"
        );
      } else {
        createUser(data);
      }
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const createUser = async (dataUser) => {
    try {
      const res = await createNewUser(dataUser);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      reset();
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <main className="AddUsers">
      <Navbar setShowMenu={setShowMenu}>Agregar usuarios</Navbar>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu}></Menu>
      <div className="AddUsers__Container">
        <h1 className="AddUsers__Container--Title">
          Ingresa los datos del usuario
        </h1>
        <form
          onSubmit={verifyUserDuplicateExist}
          className="AddUsers__Container__Form"
        >
          {dataUsersInputsProps.map(
            ({
              inputType,
              inputTitle,
              inputName,
              placeholder,
              validator,
              //   secondIcon,
              id,
            }) => (
              <>
                {inputType !== "select" ? (
                  <div className="AddUsers__Container__Form">
                    <p className="AddUsers__Container__Form--Title">
                      {inputTitle}
                    </p>
                    {/* {secondIcon && iconPassword} */}
                    <input
                      //   type={inputType}
                      type="text"
                      {...register(inputName, validator)}
                      className="AddUsers__Container__Form--Input"
                      placeholder={placeholder}
                      id={id}
                    />
                  </div>
                ) : (
                  <div className="AddUsers__Container__Form">
                    <p className="AddUsers__Container__Form--Title">
                      {inputTitle}
                    </p>
                    <select
                      {...register(inputName, validator)}
                      className="AddUsers__Container__Form--Input"
                    >
                      <option value="Administrador">Administrador</option>
                      <option value="Empleado">Empleado</option>
                    </select>
                  </div>
                )}
                <ErrorMessage
                  errors={errors}
                  name={inputName}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="AddUsers__Container__Form--SmallError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )
          )}
          <button type="submit" className="AddUsers__Container__Form--Button">
            Agregar Usuario
          </button>
        </form>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
