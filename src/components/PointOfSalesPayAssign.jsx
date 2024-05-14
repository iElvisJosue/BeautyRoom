/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
// IMPORTAMOS LOS HOOKS A USAR
import useGetClientsByFilter from "../hooks/useGetClientsByFilter";
// IMPORTAMOS LAS AYUDAS
import { generateFolio } from "../helpers/GenerateFolio";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesPayAssign.css";

export default function PointOfSalesPayAssign({
  cart,
  setCart,
  setProgressPay,
  employeesExist,
}) {
  const { clients, setFilter } = useGetClientsByFilter();
  const getClientsByFilter = (event) => {
    const value = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(value) || value === "") {
      const filter = event.target.value;
      setFilter(filter);
    }
  };
  const handleUpdateCart = () => {
    const Folio = generateFolio();
    cart.map((product) => {
      product.Cliente = document.querySelector("#client").value;
      product.EmpleadoAsignado = document.querySelector("#employee").value;
      product.NumeroDeFolio = Folio;
    });
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setProgressPay(2);
  };
  const backToCart = () => {
    setProgressPay(0);
  };

  return (
    <section className="PointOfSalesPayAssign__Cart">
      <header className="PointOfSalesPayAssign__Cart__Header">
        <button
          className="PointOfSalesPayAssign__Cart__Header--Button"
          onClick={backToCart}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
        <p className="PointOfSalesPayAssign__Cart__Header--Title">Asignación</p>
      </header>
      <div className="PointOfSalesPayAssign__Cart__Header--Content">
        <p className="PointOfSalesPayAssign__Cart__Header--Content--Title">
          Asignar empleado
        </p>
        <select
          className="PointOfSalesPayAssign__Cart__Header--Content--Input"
          id="employee"
        >
          {employeesExist &&
            employeesExist.map((employee) => (
              <option value={employee.Usuario} key={employee.idUsuario}>
                {employee.Usuario}
              </option>
            ))}
        </select>
        <p className="PointOfSalesPayAssign__Cart__Header--Content--Title">
          Asignar cliente (Buscar)
        </p>
        <input
          type="text"
          className="PointOfSalesPayAssign__Cart__Header--Content--Input"
          placeholder="Ingresa el nombre del cliente"
          onChange={getClientsByFilter}
        />
        <select
          type="text"
          className="PointOfSalesPayAssign__Cart__Header--Content--Input Result"
          id="client"
        >
          {clients.length > 0 ? (
            clients.map((client, index) => (
              <option value={client.NombreCliente} key={index}>
                {client.NombreCliente}
              </option>
            ))
          ) : (
            <option value="Sin asignar">Sin asignar</option>
          )}
        </select>
        <button
          className="PointOfSalesPayAssign__Cart__Button"
          onClick={handleUpdateCart}
        >
          Continuar
        </button>
      </div>
    </section>
  );
}
