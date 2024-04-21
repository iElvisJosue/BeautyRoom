// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import FilterButton from "../components/FilterButton";

// IMPORTAMOS LAS AYUDAS
import { listOfServices } from "../helpers/ListServices";

// IMPORTAMOS LOS ESTILOS
import "../styles/DatingHistory.css";

export default function DatingHistory() {
  return (
    <main className="DatingHistory">
      <Navbar>Historial de Citas</Navbar>
      <div className="DatingHistory__Container">
        <h1 className="DatingHistory__Container--Title">Total de citas: 12</h1>
        <h1 className="DatingHistory__Container--SubTitle">Filtra por:</h1>
        <div className="DatingHistory__Container--Filters">
          {listOfServices.map((service, index) => (
            <FilterButton key={index} position={index}>
              {service}
            </FilterButton>
          ))}
        </div>
        <div className="DatingHistory__Container--Dates">
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="ExtensionDePestañas.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="EnrizadoDePestañas.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="UñasAcrilicas.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="AplicacionDeGelish.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="Manicure.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="Pedicure.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="DiseñoDeCeja.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="CejaHD.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="HennaBrows.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
          <section className="DatingHistory__Container--Dates--Card">
            <picture className="DatingHistory__Container--Dates--Card--Img">
              <img src="PlanchadoExpress.png" alt="Icono De Corte De Pelo" />
            </picture>
            <span className="DatingHistory__Container--Dates--Card--Details">
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                👤 Elvis Josué Cortez Rivera
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                📆 10 de MARZO del 2024
              </p>
              <p className="DatingHistory__Container--Dates--Card--Details--Text">
                ⌚ 20:00 PM
              </p>
            </span>
            <span className="DatingHistory__Container--Dates--Card--Button">
              <button className="DatingHistory__Container--Dates--Card--Button--View">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </span>
          </section>
        </div>
      </div>
    </main>
  );
}
