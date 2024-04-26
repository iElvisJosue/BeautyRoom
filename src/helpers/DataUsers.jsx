export const dataUsersInputsProps = [
  {
    inputTitle: "Nombre de usuario",
    inputType: "text",
    inputName: "Usuario",
    placeholder: "Ingresa el nombre de usuario",
    id: "user",
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Contraseña",
    inputType: "password",
    inputName: "Contraseña",
    placeholder: "Ingresa la contraseña",
    id: "password",
    secondIcon: true,
    validator: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
      minLength: {
        value: 6,
        message: "¡Este campo no puede tener menos de 6 caracteres! 🔠",
      },
    },
  },
  {
    inputTitle: "Tipo de usuario",
    inputType: "select",
    inputName: "RolUsuario",
    id: "rol",
  },
];
