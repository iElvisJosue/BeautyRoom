export const modalPayInputsProps = [
  {
    isDuo: false,
    inputTitle: "Nombre",
    inputName: "payCardName",
    placeholder: "Escriba su nombre",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    isDuo: false,
    inputTitle: "Número de tarjeta",
    inputName: "payCardNumber",
    placeholder: "Escriba el número de su tarjeta",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 16,
        message: "¡Este campo no puede tener más de 16 caracteres! 🔠",
      },
      minLength: {
        value: 16,
        message: "¡Este campo no puede tener menos de 16 caracteres! 🔠",
      },
    },
  },
  {
    isDuo: true,
    inputDetails: [
      {
        inputTitle: "Fecha Expiración",
        inputName: "payCardDate",
        placeholder: "00/00",
        validator: {
          required: "¡Este campo es obligatorio! ⚠️",
          pattern: {
            value: /^\d+$/,
            message: "¡Este campo solo acepta números! 🔢",
          },
          maxLength: {
            value: 4,
            message: "¡Este campo no puede tener más de 4 caracteres! 🔠",
          },
          minLength: {
            value: 4,
            message: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
          },
        },
      },
      {
        inputTitle: "CVC",
        inputName: "payCardCVC",
        placeholder: "000",
        validator: {
          required: "¡Este campo es obligatorio! ⚠️",
          pattern: {
            value: /^\d+$/,
            message: "¡Este campo solo acepta números! 🔢",
          },
          maxLength: {
            value: 3,
            message: "¡Este campo no puede tener más de 3 caracteres! 🔠",
          },
          minLength: {
            value: 3,
            message: "¡Este campo no puede tener menos de 3 caracteres! 🔠",
          },
        },
      },
    ],
  },
];
