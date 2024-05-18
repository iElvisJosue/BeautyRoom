// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

export default function useTicketInformation() {
  const [ticketInformation, setTicketInformation] = useState({});

  return { ticketInformation, setTicketInformation };
}
