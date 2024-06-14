// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
// import Loader from "../components/Loader";
import ClientsList from "../components/ClientsList";
import ClientHistory from "../components/ClientHistory";

// IMPORTAMOS LOS HOOKS A USAR
// import useGetClients from "../hooks/useGetClients";

// IMPORTAMOS LOS ESTILOS
import "../styles/Clients.css";

export default function Clients() {
  const [showClientHistory, setShowClientHistory] = useState(false);
  const [clientSelected, setClientSelected] = useState(null);
  // const { clients, searchingClients } = useGetClients();

  // if (searchingClients) return <Loader />;

  return (
    <main className="Clients">
      <Navbar>
        {showClientHistory ? "Historial de compra" : "Lista de clientes"}
      </Navbar>
      {showClientHistory ? (
        <ClientHistory
          clientSelected={clientSelected}
          setShowClientHistory={setShowClientHistory}
        />
      ) : (
        <ClientsList
          // clients={clients}
          setShowClientHistory={setShowClientHistory}
          setClientSelected={setClientSelected}
        />
      )}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
