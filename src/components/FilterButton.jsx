/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LAS AYUDAS
import { imgListOfServices } from "../helpers/ListServices";

export default function FilterButton({ children, position }) {
  const today = new Date();
  const defaultDate = today.toISOString().substr(0, 10);

  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };
  return position === 0 ? (
    <input
      type="date"
      className="DatingHistory__Container--Filters--Button"
      style={{
        minWidth: "180px",
      }}
      value={selectedDate}
      onChange={handleChange}
    />
  ) : (
    <button className="DatingHistory__Container--Filters--Button">
      <img src={imgListOfServices[position - 1]} alt="Icono Del Filtro" />
      {children}
    </button>
  );
}
