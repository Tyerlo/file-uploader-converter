import React, { useEffect, useState } from "react";
import Footer from "./footer";
import firebase from "gatsby-plugin-firebase";
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
  Alert
} from "reactstrap";
import { Link } from "gatsby";
import { Formik } from "formik";
import * as Yup from "yup";
import { firebaseErrors } from "../context/firebaseErrors";
const ResetPassword = ({ actionCode }) => {
  const [data, setData] = useState({
    email: "",
    error: "",
    success: false,
    validCode: null,
    verifiedCode: false
  });

  const validateSchema = Yup.object({
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
    passwordOne: "",
    passwordTwo: ""
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    firebase
      .auth()
      .verifyPasswordResetCode(actionCode)
      .then((email) => {
        setData({ email, validCode: true, verifiedCode: true });
      })
      .catch((err) => {
        setData({
          error: firebaseErrors[err.code] || err.message,
          validCode: false,
          verifiedCode: true
        });
      });
  }, [actionCode]);

  const handleResetPassword = async (values) => {
    await firebase
      .auth()
      .confirmPasswordReset(actionCode, values.passwordOne)
      .then(() => {
        setData({ success: true });
      })
      .catch((err) => {
        setData({ error: firebaseErrors[err.code] || err.message });
      });
  };

  return (
    <div>
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--sub">
              {data.email && data.verifiedCode && data.validCode ? (
                <div>
                  Cambiar contraseña por <span>{data.email}</span>
                </div>
              ) : null}

              {data.verifiedCode && !data.validCode ? (
                <Alert style={{ fontSize: "1.5rem" }}>
                  Intenta a cambiar su contraseña otra vez <p>{data.error}</p>
                </Alert>
              ) : null}
            </span>
          </h1>
        </div>
        <div className="d-flex d-block align-items-center justify-content-center min-vh-100">
          <button
            disabled={!data.validCode && !data.verifiedCode}
            onClick={toggle}
            className="btn btn--dark"
          >
            Cambiar contraseña
          </button>
        </div>
        <Formik
          validationSchema={validateSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            handleResetPassword(values);
          }}
        >
          {(props) => (
            <Modal isOpen={modal} toggle={toggle}>
              {!data.success ? (
                <ModalHeader toggle={toggle}>
                  <div className="heading-list">
                    <header className="heading-list--list">
                      Cambiar contraseña
                    </header>
                  </div>
                </ModalHeader>
              ) : null}

              <ModalBody>
                {data.success ? (
                  <Alert style={{ fontSize: "1.5rem" }}>
                    Su contraseña se cambió con éxito.
                  </Alert>
                ) : (
                  <Card>
                    <CardBody>
                      <Form onSubmit={props.handleSubmit}>
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

                {data.error ? (
                  <Alert style={{ fontSize: "1.6rem" }} color="danger">
                    {data.error}
                  </Alert>
                ) : null}
              </ModalBody>
              {data.success ? (
                <ModalFooter>
                  <Link className="btn btn--dark" to="/">
                    Iniciar
                  </Link>
                </ModalFooter>
              ) : (
                <ModalFooter>
                  <button
                    disabled={
                      !props.values.passwordOne && !props.values.passwordTwo
                    }
                    className="btn btn--dark"
                    onClick={props.handleSubmit}
                  >
                    Guardar
                  </button>
                  <button className="btn btn--dark" onClick={toggle}>
                    Cancelar
                  </button>
                </ModalFooter>
              )}
            </Modal>
          )}
        </Formik>
      </header>
      <main></main>

      <Footer />
    </div>
  );
};
export default ResetPassword;
