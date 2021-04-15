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
  Alert
} from "reactstrap";
import firebase from "gatsby-plugin-firebase";
import useAuthState from "../context/auth";
import { navigate } from "gatsby";

const Register = ({ toggle, modal, setModal }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    isAdmin: false,
    error: null
  });

  const [user, loading, error] = useAuthState(firebase);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roles = {};
    setData({ ...data, error: null });
    if (data.passwordOne !== data.passwordTwo) {
      return setData({ ...data, error: "Passwords do not match" });
    }

    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.passwordOne)
      .then((authUser) => {
        setData(authUser);
      })
      .then(() => {
        let user = firebase.auth().currentUser;
        user.sendEmailVerification().then(() => {
          navigate("/success/");
          setModal((closeModal) => !closeModal);
        });
      })
      .catch((err) => {
        setData({ ...data, error: err.message });
      });
  };

  return (
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
            <header className="heading-list--list">Crear una cuenta</header>
          </div>
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label style={{ fontSize: "1.5rem" }} for="email">
                    Correo
                  </Label>
                  <Input
                    onChange={handleChange}
                    style={{ fontSize: "1.5rem" }}
                    type="email"
                    value={data.email}
                    name="email"
                  />
                </FormGroup>
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
                  <Label style={{ fontSize: "1.5rem" }} for="password-confirm">
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
        </ModalBody>
        {data.error ? (
          <Alert style={{ fontSize: "1.5rem" }} color="danger">
            <i className="fas fa-times mr-1" />
            {data.error}
          </Alert>
        ) : null}
        <ModalFooter>
          <button
            disabled={loading}
            className="btn btn--dark"
            onClick={handleSubmit}
          >
            Crear
          </button>
          <button className="btn btn--dark" onClick={toggle}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Register;
