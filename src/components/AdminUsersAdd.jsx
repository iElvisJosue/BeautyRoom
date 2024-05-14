/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useGetServices from "../hooks/useGetServices";

// IMPORTAMOS LAS AYUDAS
import { dataUsersInputsProps } from "../helpers/DataUsers";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

export default function AdminUsersAdd({ setOptionSubMenu }) {
  const [typeUser, setTypeUser] = useState("Administrador");
  const { verifyUserExist, createNewUser } = useGlobal();
  const { services } = useGetServices();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const verifyUserDuplicateExist = handleSubmit(async (data) => {
    // CONVERTIMOS EL OBJETO A UN ARREGLO PERO CON LA CONDICIÓN DE QUE SOLO
    // A PARTIR DEL 3° ELEMENTO
    const dataUser = Object.keys(data).map(
      (key, index) => index > 2 && data[key]
    );

    // FILTRAMOS LOS ELEMENTOS VACÍOS
    const dataUserFiltered = dataUser.filter((value) => value !== "" && value);
    const dataUserWithServices = {
      Usuario: data.Usuario,
      Contraseña: data.Contraseña,
      RolUsuario: data.RolUsuario,
      Servicios: dataUserFiltered,
    };
    try {
      const res = await verifyUserExist(dataUserWithServices);
      if (res.data.length > 0) {
        return toast.error(
          "Ya existe un usuario con este nombre, por favor ingresa otro ❌"
        );
      } else {
        createUser(dataUserWithServices);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const createUser = async (dataUserWithServices) => {
    try {
      const res = await createNewUser(dataUserWithServices);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setOptionSubMenu(0);
      reset();
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const changeTypeUser = (event) => {
    setTypeUser(event.target.value);
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
                <input
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
                  onChange={changeTypeUser}
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
      {typeUser === "Empleado" && services && (
        <>
          <p className="AddUsers__Container__Form--Data--Title">
            Selecciona los servicios para este usuario
          </p>
          {services.map(({ NombreServicio, idServicio }) => (
            <div
              className="AddUsers__Container__Form--Services"
              key={idServicio}
            >
              <p className="AddUsers__Container__Form--Services--Title">
                {NombreServicio}
              </p>
              <select
                className="AddUsers__Container__Form--Services--Input"
                {...register(NombreServicio)}
              >
                <option value={idServicio}>Sí</option>
                <option value="">No</option>
              </select>
            </div>
          ))}
        </>
      )}

      <button type="submit" className="AddUsers__Container__Form--Data--Button">
        Agregar Usuario
      </button>
    </form>
  );
}
