/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES
import Loader from "./Loader";
import NotResults from "./NotResults";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useGetAllEmployees from "../hooks/useGetAllEmployees";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminUsersList.css";

export default function AdminUsersList({
  setOptionSubMenu,
  setUserInformation,
}) {
  const { user } = useGlobal();
  const { employeesExist, searchingExist } = useGetAllEmployees();

  const handleEditUser = (userInformation) => {
    setOptionSubMenu(2);
    setUserInformation(userInformation);
  };

  if (searchingExist) return <Loader />;

  const validateUserProfile = (userArray, userLogged) => {
    return userArray === userLogged;
  };

  return (
    <div className="AdminUsersList__Container">
      {employeesExist.length > 0 ? (
        employeesExist.map((userInformation) => (
          <section
            className={
              validateUserProfile(userInformation.idUsuario, user.id)
                ? "AdminUsersList__Container__Card MyProfile"
                : "AdminUsersList__Container__Card"
            }
            key={userInformation.idUsuario}
            id={userInformation.idUsuario}
          >
            <div className="AdminUsersList__Container__Card--Details">
              <picture className="AdminUsersList__Container__Card--Details--Img">
                <img
                  src={`${userInformation.RolUsuario}.png`}
                  alt="Icono del rol de usuario"
                />
              </picture>
              <span className="AdminUsersList__Container__Card--Details--Information">
                <p className="AdminUsersList__Container__Card--Details--Information--Text">
                  👤 {userInformation.Usuario}{" "}
                  {validateUserProfile(userInformation.idUsuario, user.id) &&
                    "- (Mi perfil)"}
                </p>
                <p className="AdminUsersList__Container__Card--Details--Information--Text"></p>
              </span>
              <span className="AdminUsersList__Container__Card--Details--Information--Button">
                {userInformation.RolUsuario === "Empleado" ||
                validateUserProfile(userInformation.idUsuario, user.id) ? (
                  <button
                    className="AdminUsersList__Container__Card--Details--Information--Button--View"
                    onClick={() => handleEditUser(userInformation)}
                  >
                    <ion-icon name="brush-outline"></ion-icon>
                  </button>
                ) : null}
              </span>
            </div>
          </section>
        ))
      ) : (
        <NotResults responsive={true}>No hay usuario registrados</NotResults>
      )}
    </div>
  );
}
