// IMPORTAMOS LOS COMPONENTES
import Loader from "./Loader";
import NotResults from "./NotResults";

// IMPORTAMOS LOS HOOKS A USAR
import useGetEmployees from "../hooks/useGetEmployees";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminUsersList.css";

export default function AdminUsersList() {
  const { employees, searchingEmployees } = useGetEmployees();

  if (searchingEmployees) return <Loader />;

  return (
    <div className="AdminUsersList__Container">
      {employees.length > 0 ? (
        employees.map(({ idUsuario, Usuario, RolUsuario }) => (
          <section
            className="AdminUsersList__Container__Card"
            key={idUsuario}
            id={idUsuario}
          >
            <div className="AdminUsersList__Container__Card--Details">
              <picture className="AdminUsersList__Container__Card--Details--Img">
                <img src={`${RolUsuario}.png`} alt="Icono del rol de usuario" />
              </picture>
              <span className="AdminUsersList__Container__Card--Details--Information">
                <p className="AdminUsersList__Container__Card--Details--Information--Text">
                  👤 {Usuario}
                </p>
              </span>
              <span className="AdminUsersList__Container__Card--Details--Information--Button">
                <button
                  className="AdminUsersList__Container__Card--Details--Information--Button--View"
                  // onClick={setDataDateOnInputs}
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
