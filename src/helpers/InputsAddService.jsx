export const dataAddServiceInputsProps = [
  {
    inputTitle: "Nombre del servicio",
    inputType: "text",
    inputName: "NombreServicio",
    placeholder: "Ingresa el nombre del servicio",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Estado del servicio",
    inputType: "select",
    inputName: "EstadoServicio",
  },
];
