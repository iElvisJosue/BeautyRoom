// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { dataUsersInputsProps } from "../helpers/DataUsers";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function AdminUsersAdd() {
  const { verifyUserExist, createNewUser } = useGlobal();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

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
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <form
      onSubmit={verifyUserDuplicateExist}
      className="AddUsers__Container__Form"
    >
      {dataUsersInputsProps.map(
        ({ inputType, inputTitle, inputName, placeholder, validator, id }) => (
          <>
            {inputType !== "select" ? (
              <div className="AddUsers__Container__Form--Data">
                <p className="AddUsers__Container__Form--Data--Title">
                  {inputTitle}
                </p>
                {/* {secondIcon && iconPassword} */}
                <input
                  //   type={inputType}
                  type="text"
                  {...register(inputName, validator)}
                  className="AddUsers__Container__Form--Data--Input"
                  placeholder={placeholder}
                  id={id}
                />
              </div>
            ) : (
              <div className="AddUsers__Container__Form--Data">
                <p className="AddUsers__Container__Form--Data--Title">
                  {inputTitle}
                </p>
                <select
                  {...register(inputName, validator)}
                  className="AddUsers__Container__Form--Data--Input"
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
                    className="AddUsers__Container__Form--Data--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <button type="submit" className="AddUsers__Container__Form--Data--Button">
        Agregar Usuario
      </button>
    </form>
  );
}
