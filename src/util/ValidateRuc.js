import * as Yup from "yup";
export const validateRuc = Yup.object({
	selectRuc: Yup.string().oneOf(
		["Plan 1", "Plan 2", "Plan 3", "Plan 4", "Plan 5"],
		null
	),
	ruc: Yup.string()
		.required("Ruc requerido")
		.matches(/^[0-9]+$/, "Solo numeros")
		.min(13, "Debe tener exactamente 13 digitos")
		.max(13, "Debe tener exactamente 13 digitos"),
	ruc2: Yup.string()
		.notRequired()
		.when("selectRuc", {
			is: (val) => val === "Plan 1",
			otherwise: Yup.string().required("Ruc #2 requerido")
		})
		.matches(/^[0-9]+$/, "Solo numeros")
		.min(13, "Debe tener exactamente 13 digitos")
		.max(13, "Debe tener exactamente 13 digitos"),
	ruc3: Yup.string()
		.notRequired()
		.when("selectRuc", {
			is: (val) => val === "Plan 2" || val === "Plan 3",
			otherwise: Yup.string().required("Ruc #3 requerido")
		})
		.matches(/^[0-9]+$/, "Solo numeros")
		.min(13, "Debe tener exactamente 13 digitos")
		.max(13, "Debe tener exactamente 13 digitos"),
	ruc4: Yup.string()
		.notRequired()
		.when("selectRuc", {
			is: (val) => val === "Plan 1" || val === "Plan 2" || val === "Plan 3",
			otherwise: Yup.string().required("Ruc #4 requerido")
		})
		.matches(/^[0-9]+$/, "Solo numeros")
		.min(13, "Debe tener exactamente 13 digitos")
		.max(13, "Debe tener exactamente 13 digitos"),
	ruc5: Yup.string()
		.notRequired()
		.when("selectRuc", {
			is: (val) =>
				val === "Plan 1" ||
				val === "Plan 2" ||
				val === "Plan 3" ||
				val === "Plan 4",
			otherwise: Yup.string().required("Ruc #5 requerido")
		})
		.matches(/^[0-9]+$/, "Solo numeros")
		.min(13, "Debe tener exactamente 13 digitos")
		.max(13, "Debe tener exactamente 13 digitos")
});
export const initialRuc = {
	selectRuc: "",
	ruc: "",
	ruc2: "",
	ruc3: "",
	ruc4: "",
	ruc5: ""
};
