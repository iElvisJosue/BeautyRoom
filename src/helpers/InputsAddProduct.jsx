export const dataAddProductInputsProps = [
  {
    inputTitle: "Nombre del producto",
    inputType: "text",
    inputName: "NombreProducto",
    placeholder: "Ingresa el nombre del producto",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 200,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Precio del producto (Venta)",
    inputType: "text",
    inputName: "PrecioProducto",
    placeholder: "Ejemplo: 150",
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
  {
    inputTitle: "Descuento del producto",
    inputType: "text",
    inputName: "DescuentoProducto",
    placeholder: "Ejemplo: 0",
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
    },
  },
  {
    inputTitle: "Stock del producto",
    inputType: "text",
    inputName: "CantidadProducto",
    placeholder: "Ejemplo: 450",
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
  {
    inputTitle: "Descripción del producto",
    inputType: "textarea",
    inputName: "DescripcionProducto",
    placeholder: "Escribe una descripción del producto",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Costo del producto (Adquisición)",
    inputType: "text",
    inputName: "CostoProducto",
    placeholder: "Ejemplo: 45000",
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
