/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useGetServicesByUser from "../hooks/useGetServicesByUser";
import useGetServices from "../hooks/useGetServices";

// IMPORTAMOS LAS AYUDAS
import { dataUsersInputsProps } from "../helpers/DataUsers";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminUserEdit.css";

export default function AdminUserEdit({ setOptionSubMenu, userInformation }) {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const { services } = useGetServices();

  const { servicesByUser } = useGetServicesByUser({
    idUsuario: userInformation?.idUsuario,
  });
  const { verifyUserExist, updateDataUser } = useGlobal();

  useEffect(() => {
    setValue("Usuario", userInformation?.Usuario);
    setValue("Contraseña", userInformation?.Contraseña);
    setValue("RolUsuario", userInformation?.RolUsuario);
  }, []);

  const verifyUserDuplicateExist = handleSubmit(async (data) => {
    // CONVERTIMOS EL OBJETO A UN ARREGLO PERO CON LA CONDICIÓN DE QUE SOLO
    // A PARTIR DEL 4° ELEMENTO
    const dataUser = Object.keys(data).map(
      (key, index) => index > 2 && data[key]
    );

    // FILTRAMOS LOS ELEMENTOS VACÍOS
    const dataUserFiltered = dataUser.filter((value) => value !== "" && value);
    const dataUserWithServices = {
      idUsuario: userInformation?.idUsuario,
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
        handleUpdateDataUser(dataUserWithServices);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const handleUpdateDataUser = async (dataUserWithServices) => {
    try {
      const res = await updateDataUser(dataUserWithServices);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setOptionSubMenu(0);
      reset();
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  if (services && servicesByUser) {
    for (let i = 0; i < services.length; i++) {
      const { idServicio, NombreServicio } = services[i];
      const value = servicesByUser?.find(
        ({ idServicio: idServicioByUser }) => idServicioByUser === idServicio
      );
      setValue(NombreServicio, value ? value?.idServicio.toString() : "");
    }
  }

  return (
    <section className="AdminUserEdit">
      <p className="AdminUserEdit__Title">Actualizar Usuario</p>
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
            id,
          }) => (
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
                  >
                    <option value="Empleado">Empleado</option>
                    <option value="Administrador">Administrador</option>
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
        <p className="AddUsers__Container__Form--Data--Title">
          Selecciona los servicios para este usuario
        </p>
        {services &&
          services.map(({ NombreServicio, idServicio }) => (
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
        <button
          type="submit"
          className="AddUsers__Container__Form--Data--Button"
        >
          Actualizar
        </button>
      </form>
    </section>
  );
}
