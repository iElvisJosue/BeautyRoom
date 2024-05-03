/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES
import Loader from "./Loader";
import NotResults from "./NotResults";

// IMPORTAMOS LOS HOOKS A USAR
import useGetEmployees from "../hooks/useGetEmployees";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminUsersList.css";

export default function AdminUsersList({
  setOptionSubMenu,
  setUserInformation,
}) {
  const { employees, searchingEmployees } = useGetEmployees();

  const handleEditUser = (userInformation) => {
    setOptionSubMenu(2);
    setUserInformation(userInformation);
  };

  if (searchingEmployees) return <Loader />;

  return (
    <div className="AdminUsersList__Container">
      {employees.length > 0 ? (
        employees.map((userInformation) => (
          <section
            className="AdminUsersList__Container__Card"
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
                  👤 {userInformation.Usuario}
                </p>
              </span>
              <span className="AdminUsersList__Container__Card--Details--Information--Button">
                <button
                  className="AdminUsersList__Container__Card--Details--Information--Button--View"
                  onClick={() => handleEditUser(userInformation)}
                >
                  <ion-icon name="brush-outline"></ion-icon>
                </button>
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
