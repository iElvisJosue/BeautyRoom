export const inputsModalAdminService = [
  {
    inputTitle: "Nombre Servicio",
    inputType: "text",
    inputName: "NombreServicio",
    placeholder: "Escribe el servicio aquí...",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Estado Servicio",
    inputType: "select",
    inputName: "EstadoServicio",
  },
];
