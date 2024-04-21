// LISTA DE SERVICIOS
const services = [
  "Selecciona un servicio",
  "Extensiones de pestañas",
  "Lash lifting de pestañas",
  "Uñas acrílicas",
  "Aplicación de gelish",
  "Manicure",
  "Pedicure",
  "Diseño de ceja",
  "Ceja HD",
  "Ceja 4K",
  "Henna brows",
  "Planchado express",
];

export const imgListOfServices = [
  "IconoExtensionDePestañas.png",
  "IconoEnrizadoDePestañas.png",
  "IconoUñasAcrilicas.png",
  "IconoAplicacionDeGelish.png",
  "IconoManicure.png",
  "IconoPedicure.png",
  "IconoDiseñoDeCeja.png",
  "IconoCejaHD.png",
  "IconoCejaHD.png",
  "IconoHennaBrows.png",
  "IconoPlanchadoExpress.png",
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
