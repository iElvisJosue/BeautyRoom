/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { toast } from "sonner";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";
// IMPORTAMOS LOS HOOKS A USAR
import useGetClientsByFilter from "../hooks/useGetClientsByFilter";
// IMPORTAMOS LAS AYUDAS
import { generateFolio } from "../helpers/GenerateFolio";
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSalesPayAssign.css";

export default function PointOfSalesPayAssign({
  cart,
  setCart,
  setProgressPay,
}) {
  const [addClient, setAddClient] = useState(false);
  const { clients, setFilter } = useGetClientsByFilter();
  const { createClient } = useDates();
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
      product.NumeroDeFolio = Folio;
    });
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setProgressPay(2);
  };
  const backToCart = () => {
    setProgressPay(0);
  };
  const handleValidateInputs = () => {
    const NombreCliente = document.querySelector("#NombreCliente").value;
    const TelefonoCliente = document.querySelector("#TelefonoCliente").value;

    const regexOnlyNumbers = /^[0-9]+$/;
    if (NombreCliente !== "" && TelefonoCliente !== "") {
      if (
        regexOnlyNumbers.test(TelefonoCliente) &&
        TelefonoCliente.length === 10
      ) {
        createNewClient(NombreCliente, TelefonoCliente);
      } else {
        toast.error("Por favor ingrese un teléfono válido ❌");
      }
    } else {
      toast.error("Por favor rellene todos los campos ❌");
    }
  };
  const createNewClient = async (NombreCliente, TelefonoCliente) => {
    const dataClient = {
      NombreCliente,
      TelefonoCliente,
    };
    try {
      const res = await createClient(dataClient);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setAddClient(false);
        document.querySelector("#BuscarCliente").value = "";
        setFilter("");
      }
    } catch (error) {
      console.error(error);
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
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
          Asignar cliente (Buscar)
        </p>
        <input
          type="text"
          className="PointOfSalesPayAssign__Cart__Header--Content--Input"
          placeholder="Ingresa el nombre del cliente"
          id="BuscarCliente"
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
        <small
          className="PointOfSalesPayAssign__Cart__Header--Content--Small"
          onClick={() => {
            setAddClient(!addClient);
            document.querySelector("#BuscarCliente").value = "";
            setFilter("");
          }}
        >
          {addClient ? "Ocultar" : "Agregar cliente"}
        </small>
        {addClient && (
          <>
            <p className="PointOfSalesPayAssign__Cart__Header--Content--Title">
              Agregar cliente
            </p>
            <input
              type="text"
              className="PointOfSalesPayAssign__Cart__Header--Content--Input"
              placeholder="Nombre del cliente"
              id="NombreCliente"
              maxLength="100"
            />
            <input
              type="text"
              className="PointOfSalesPayAssign__Cart__Header--Content--Input"
              placeholder="Telefono del cliente"
              id="TelefonoCliente"
              maxLength="10"
            />
          </>
        )}
        {addClient ? (
          <button
            className="PointOfSalesPayAssign__Cart__Button"
            onClick={handleValidateInputs}
          >
            Agregar
          </button>
        ) : (
          <button
            className="PointOfSalesPayAssign__Cart__Button"
            onClick={handleUpdateCart}
          >
            Continuar
          </button>
        )}
      </div>
    </section>
  );
}
