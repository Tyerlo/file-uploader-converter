import React, { useState } from "react";
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

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    isAdmin: false,
    error: null
  });

  const [user, loading, error] = useAuthState(firebase);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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

    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.passwordOne);
      setData(result);
    } catch (err) {
      setData({ ...data, error: err.message });
    }
  };

  return (
    <div className="btn--user-info">
      <button className="btn btn--dark" onClick={toggle}>
        Entrar
      </button>

      <Modal contentClassName="modalDialog" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <div className="heading-list">
            <header className="heading-list--list"> Crear una cuenta</header>
          </div>
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label style={{ fontSize: "1.5rem" }} for="email">
                    Email
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
                    Password
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
                    Confirm Password
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
          <button className="btn btn--dark" onClick={handleSubmit}>
            Crear
          </button>
          <button className="btn btn--dark" onClick={toggle}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );

  /* {user && (
            <Fragment>
              <button
                className="btn btn--dark"
                onClick={() => {
                  netlifyIdentity.logout();
                }}
              >
                logout
              </button>
              <h1 className="heading-primary">
                <span className="heading-primary--welcome">
                  Bienvenido {user.user_metadata.full_name}
                </span>
              </h1>
            </Fragment>
          )} */

  /* </div> */
};

export default Register;
