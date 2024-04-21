// LISTA DE SERVICIOS
const services = [
  "Selecciona un servicio",
  "Uñas",
  "Tratamiento Capilar",
  "Corte De Pelo",
];
export const listOfServices = services.map((service, index) =>
  index === 0 ? (
    <option
      key={index}
      value="Selecciona un servicio"
      defaultValue={true}
      hidden
    >
      {service}
    </option>
  ) : (
    <option key={index} value={service}>
      {service}
    </option>
  )
);
