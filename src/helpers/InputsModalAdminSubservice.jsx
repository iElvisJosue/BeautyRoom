export const inputsModalAdminSubservice = [
  {
    inputTitle: "Nombre Subservicio",
    inputType: "text",
    inputName: "NombreSubservicio",
    placeholder: "Escribe el subservicio aquí...",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Costo Subservicio",
    inputType: "text",
    inputName: "CostoSubservicio",
    placeholder: "Ejemplo: 200",
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
    },
  },
];
