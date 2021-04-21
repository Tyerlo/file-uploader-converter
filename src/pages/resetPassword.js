import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
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
const ResetPassword = ({ actionCode }) => {
  const [data, setData] = useState({
    email: "",
    error: "",
    passwordOne: "",
    passwordTwo: "",
    success: false,
    validCode: null,
    verifiedCode: false
  });

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
        setData({ error: err.message, validCode: false, verifiedCode: true });
      });
  }, [actionCode]);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (data.passwordOne !== data.passwordTwo) {
      return setData({ ...data, error: "Passwords do not match" });
    }

    await firebase
      .auth()
      .confirmPasswordReset(actionCode, data.passwordOne)
      .then(() => {
        setData({ success: true });
      })
      .catch((err) => {
        setData({ error: err.message });
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
                  <Form onSubmit={handleResetPassword}>
                    <FormGroup>
                      <Label style={{ fontSize: "1.5rem" }} for="password">
                        Contraseña
                      </Label>
                      <Input
                        onChange={handleChange}
                        style={{ fontSize: "1.5rem" }}
                        type="password"
                        value={data.passwordOne}
                        name="passwordOne"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        style={{ fontSize: "1.5rem" }}
                        for="password-confirm"
                      >
                        Confirmar Contraseña
                      </Label>
                      <Input
                        onChange={handleChange}
                        style={{ fontSize: "1.5rem" }}
                        type="password"
                        value={data.passwordTwo}
                        name="passwordTwo"
                      />
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
                disabled={!data.passwordOne && !data.passwordTwo}
                className="btn btn--dark"
                onClick={handleResetPassword}
              >
                Guardar
              </button>
              <button className="btn btn--dark" onClick={toggle}>
                Cancelar
              </button>
            </ModalFooter>
          )}
        </Modal>
      </header>
      <main></main>

      <Footer />
    </div>
  );
};
export default ResetPassword;
