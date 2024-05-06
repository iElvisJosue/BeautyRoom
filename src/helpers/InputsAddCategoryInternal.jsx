export const dataAddCategoryInternalInputsProps = [
  {
    inputTitle: "Nombre de la categoria",
    inputType: "text",
    inputName: "NombreCategoria",
    placeholder: "Ingresa el nombre de la categoría",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
];
