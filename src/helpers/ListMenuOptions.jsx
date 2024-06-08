// IMPORTAMOS LAS AYUDAS A USAR
import { HOST } from "./Urls";

export const listMenuOptions = [
  {
    imgMenuOption: "MisCitas.png",
    altImgMenuOption: "Icono menú Mis Citas",
    nameMenuOption: "Mis Citas",
    hrefOption: `${HOST}/MisCitas`,
    userRol: "Empleado",
  },
  {
    imgMenuOption: "AgendarCita.png",
    altImgMenuOption: "Icono menú Agendar Cita Administrador",
    nameMenuOption: "Agendar Cita",
    hrefOption: `${HOST}/AgendarCitaAdministrador`,
    userRol: "Administrador",
  },
  {
    imgMenuOption: "PuntoDeVenta.png",
    altImgMenuOption: "Icono menú Punto de Venta",
    nameMenuOption: "Punto de Venta",
    hrefOption: `${HOST}/PuntoDeVenta`,
    userRol: "Administrador",
  },
  {
    imgMenuOption: "AdministrarCitas.png",
    altImgMenuOption: "Icono menú Administrar Citas",
    nameMenuOption: "Administrar Citas",
    hrefOption: `${HOST}/AdministrarCitas`,
    userRol: "Administrador",
  },
  {
    imgMenuOption: "AdministrarUsuarios.png",
    altImgMenuOption: "Icono menú Administrar usuarios",
    nameMenuOption: "Administrar usuarios",
    hrefOption: `${HOST}/AdministrarUsuarios`,
    userRol: "Administrador",
  },
  {
    imgMenuOption: "AdministrarInventarioProductos.png",
    altImgMenuOption: "Icono menú Administrar Inventario de Productos",
    nameMenuOption: "Administrar Inventario de Productos",
    hrefOption: `${HOST}/AdministrarInventarioProductos`,
    userRol: "Administrador",
  },
  {
    imgMenuOption: "AdministrarInventarioServicios.png",
    altImgMenuOption: "Icono menú Administrar Inventario de Servicios",
    nameMenuOption: "Administrar Inventario de Servicios",
    hrefOption: `${HOST}/AdministrarInventarioServicios`,
    userRol: "Administrador",
  },
  {
    imgMenuOption: "AdministrarInventarioInterno.png",
    altImgMenuOption: "Icono menú Administrar Inventario Interno",
    nameMenuOption: "Administrar Inventario Interno",
    hrefOption: `${HOST}/AdministrarInventarioInterno`,
    userRol: "Administrador",
  },
  {
    imgMenuOption: "Ventas.png",
    altImgMenuOption: "Icono menú Ventas",
    nameMenuOption: "Reporte de Ventas",
    hrefOption: `${HOST}/ReporteVentas`,
    userRol: "Administrador",
  },
  {
    imgMenuOption: "Clientes.png",
    altImgMenuOption: "Icono menú Clientes",
    nameMenuOption: "Lista de Clientes",
    hrefOption: `${HOST}/ListaClientes`,
    userRol: "Administrador",
  },
];
