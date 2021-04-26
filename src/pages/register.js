import React, { useState, Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Alert,
  Spinner
} from "reactstrap";
import firebase from "gatsby-plugin-firebase";
import useAuthState from "../context/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { firebaseErrors } from "../context/firebaseErrors";

const Register = ({ toggle, modal }) => {
  const [data, setData] = useState({
    error: null,
    formSent: false,
    working: false
  });
  const [charLeft] = useState(13);
  const [user, loading, error] = useAuthState(firebase);

  const handleSubmit = async (values) => {
    setData({ ...data, error: null });

    await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.passwordOne)
      .then((authUser) => {
        setData(authUser);
      })
      .then(() => {
        let user = firebase.auth().currentUser;
        user.sendEmailVerification().then(() => {
          setData({ ...data, formSent: true, working: false });
        });
        user.updateProfile({
          displayName: values.ruc
        });
        firebase.firestore().collection("users").add({
          uid: user.uid,
          email: user.email,
          username: values.ruc
        });
      })
      .catch((err) => {
        setData({
          ...data,
          error: firebaseErrors[err.code] || err.message,
          working: false
        });
      });
  };

  const validateSchema = Yup.object({
    ruc: Yup.string()
      .required("Ruc requerido")
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

  const initialValues = {
    ruc: "",
    email: "",
    passwordOne: "",
    passwordTwo: ""
  };

  return (
    <Formik
      validationSchema={validateSchema}
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(props) => (
        <Fragment>
          <button
            disabled={loading}
            className="btn btn--dark mr-3"
            onClick={toggle}
          >
            Crear cuenta
          </button>
          <Modal contentClassName="modalDialog" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              <div className="heading-list">
                {data.formSent ? null : (
                  <header className="heading-list--list">
                    Crear una cuenta
                  </header>
                )}
              </div>
            </ModalHeader>
            <ModalBody>
              {data.working ? (
                <button className="btn btn--dark">
                  <Spinner size="md" role="status"></Spinner>
                  Cargando...
                </button>
              ) : data.formSent ? (
                <Alert style={{ fontSize: "1.5rem" }}>
                  Verificar link en el correo electrónico
                </Alert>
              ) : (
                <Card>
                  <CardBody>
                    <Form onSubmit={props.handleSubmit}>
                      <FormGroup>
                        <Label style={{ fontSize: "1.5rem" }} for="email">
                          Ruc
                        </Label>
                        <Input
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          style={{ fontSize: "1.5rem" }}
                          type="text"
                          value={props.values.ruc}
                          name="ruc"
                          maxLength={13}
                        />
                        {props.errors.ruc && props.touched.ruc ? (
                          <div
                            style={{ fontSize: "1.5rem" }}
                            className="text-danger"
                          >
                            <i className="fas fa-times mr-1" />
                            {props.errors.ruc}
                          </div>
                        ) : null}
                        <p
                          style={{ fontSize: "1.5rem" }}
                          className="float-right"
                        >
                          {props.values.ruc.length}/{charLeft}
                        </p>
                      </FormGroup>
                      <FormGroup>
                        <Label style={{ fontSize: "1.5rem" }} for="email">
                          Correo
                        </Label>
                        <Input
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          style={{ fontSize: "1.5rem" }}
                          type="email"
                          value={props.values.email}
                          name="email"
                        />
                        {props.errors.email && props.touched.email ? (
                          <div
                            style={{ fontSize: "1.5rem" }}
                            className="text-danger"
                          >
                            <i className="fas fa-times mr-1" />
                            {props.errors.email}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label style={{ fontSize: "1.5rem" }} for="password">
                          Contraseña
                        </Label>
                        <Input
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          style={{ fontSize: "1.5rem" }}
                          type="password"
                          value={props.values.passwordOne}
                          name="passwordOne"
                        />
                        {props.errors.passwordOne &&
                        props.touched.passwordOne ? (
                          <div
                            style={{ fontSize: "1.5rem" }}
                            className="text-danger"
                          >
                            <i className="fas fa-times mr-1" />
                            {props.errors.passwordOne}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <Label
                          style={{ fontSize: "1.5rem" }}
                          for="password-confirm"
                        >
                          Confirmar Contraseña
                        </Label>
                        <Input
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          style={{ fontSize: "1.5rem" }}
                          type="password"
                          value={props.values.passwordTwo}
                          name="passwordTwo"
                        />
                        {props.errors.passwordTwo &&
                        props.touched.passwordTwo ? (
                          <div
                            style={{ fontSize: "1.5rem" }}
                            className="text-danger"
                          >
                            <i className="fas fa-times mr-1" />
                            {props.errors.passwordTwo}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              )}
            </ModalBody>
            {data.error ? (
              <Alert style={{ fontSize: "1.5rem" }} color="danger">
                {data.error}
              </Alert>
            ) : null}
            <ModalFooter>
              {data.formSent ? null : (
                <Fragment>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn--dark"
                    onClick={props.handleSubmit}
                  >
                    Crear
                  </button>
                  <button className="btn btn--dark" onClick={toggle}>
                    Cancelar
                  </button>
                </Fragment>
              )}
            </ModalFooter>
          </Modal>
        </Fragment>
      )}
    </Formik>
  );
};

export default Register;
