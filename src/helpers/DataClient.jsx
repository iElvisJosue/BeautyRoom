export const dataClientInputsProps = [
  {
    inputTitle: "Nombre",
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
    placeholder: "Ejemplo: 56987654321",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 20,
        message: "¡Este campo no puede tener más de 20 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Motivo de la Cita",
    inputType: "select",
    inputName: "MotivoCita",
  },
];
