// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";

// IMPORTAMOS LOS ESTILOS
import "../styles/DatingHistory.css";

export default function DatingHistory() {
  return (
    <main className="DatingHistory">
      <Navbar>Historial de Citas</Navbar>
      <div className="DatingHistory__Container">
        <h1 className="DatingHistory__Container--Title">
          Filtrar por: Todas las citas | 20
        </h1>
        <div className="DatingHistory__Container--Filters">
          <button className="DatingHistory__Container--Filters--Button">
            <ion-icon name="apps-outline"></ion-icon>
            <p>Todo</p>
          </button>
          <button className="DatingHistory__Container--Filters--Button">
            <ion-icon name="calendar-outline"></ion-icon>
            <p>Fecha</p>
          </button>
          <button className="DatingHistory__Container--Filters--Button">
            <ion-icon name="hand-right-outline"></ion-icon> <p>Uñas</p>
          </button>
          <button className="DatingHistory__Container--Filters--Button">
            <ion-icon name="flask-outline"></ion-icon>{" "}
            <p>Tratamiento capilar</p>
          </button>
          <button className="DatingHistory__Container--Filters--Button">
            <ion-icon name="cut-outline"></ion-icon> <p>Corte de pelo</p>
          </button>
        </div>
      </div>
    </main>
  );
}
