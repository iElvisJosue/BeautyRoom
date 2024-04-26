export const dataUpdateDateInputsProps = [
  {
    inputTitle: "Nombre del cliente",
    inputType: "text",
    inputName: "NombreCliente",
    placeholder: "Escribe tu nombre aquí...",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Número de Teléfono",
    inputType: "text",
    inputName: "TelefonoCliente",
    placeholder: "Ejemplo: 7444523691",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 10,
        message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
      },
      minLength: {
        value: 10,
        message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Motivo de la Cita",
    inputType: "select",
    inputName: "MotivoCita",
  },
];
