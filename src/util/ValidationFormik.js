import * as Yup from "yup";
export const validateSchema = Yup.object({
  email: Yup.string()
    .email("Correo invalido")
    .required("Correo electronico requerido"),
  passwordOne: Yup.string()
    .required("Por favor, introduzca su contraseña")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "Debe contener 6 caracteres, una mayúscula, una minúscula, un número y un carácter en mayúsculas y minúsculas"
    ),
  passwordTwo: Yup.string()
    .required("Por favor, confirmar su contraseña")
    .oneOf([Yup.ref("passwordOne"), null], "Las contraseñas no coinciden")
});

export const initialValues = {
  email: "",
  passwordOne: "",
  passwordTwo: ""
};
