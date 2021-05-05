import * as Yup from "yup";
export const validateSchema = Yup.object({
  selectRuc: Yup.string()
    .oneOf(["1", "2", "3", "4", "5"], null)
    .required("Elegir un ruc"),
  ruc: Yup.string()
    .required("Ruc requerido")
    .matches(/^[0-9]+$/, "Solo numeros")
    .min(13, "Debe tener exactamente 13 digitos")
    .max(13, "Debe tener exactamente 13 digitos"),
  ruc2: Yup.string()
    .required("Ruc #2 requerido")
    .matches(/^[0-9]+$/, "Solo numeros")
    .min(13, "Debe tener exactamente 13 digitos")
    .max(13, "Debe tener exactamente 13 digitos"),
  ruc3: Yup.string()
    .required("Ruc #3 requerido")
    .matches(/^[0-9]+$/, "Solo numeros")
    .min(13, "Debe tener exactamente 13 digitos")
    .max(13, "Debe tener exactamente 13 digitos"),
  ruc4: Yup.string()
    .required("Ruc #4 requerido")
    .matches(/^[0-9]+$/, "Solo numeros")
    .min(13, "Debe tener exactamente 13 digitos")
    .max(13, "Debe tener exactamente 13 digitos"),
  ruc5: Yup.string()
    .required("Ruc #5 requerido")
    .matches(/^[0-9]+$/, "Solo numeros")
    .min(13, "Debe tener exactamente 13 digitos")
    .max(13, "Debe tener exactamente 13 digitos"),
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
  ruc: "",
  ruc2: "",
  ruc3: "",
  ruc4: "",
  ruc5: "",
  selectRuc: "",
  email: "",
  passwordOne: "",
  passwordTwo: ""
};
