import React, { Fragment, useState } from "react";
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
import * as ROUTES from "../constants/routes";

const LoginPage = ({ toggle }) => {
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
          navigate(ROUTES.SUCCESS_PAGE);
        });
      })
      .catch((err) => {
        setData({ ...data, error: err.message });
      });
  };
  return (
    <Fragment>
      <ModalHeader toggle={toggle}>
        <div className="heading-list">
          <header className="heading-list--list"> Iniciar session</header>
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
                  value={data && data.email}
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
                  value={data && data.passwordOne}
                  name="passwordOne"
                />
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </ModalBody>
      {data && data.error ? (
        <Alert style={{ fontSize: "1.5rem" }} color="danger">
          <i className="fas fa-times mr-1" />
          {data && data.error}
        </Alert>
      ) : null}
      <ModalFooter>
        <button
          disabled={loading}
          className="btn btn--dark"
          onClick={handleSubmit}
        >
          Iniciar
        </button>
        <button className="btn btn--dark" onClick={toggle}>
          Cancelar
        </button>
      </ModalFooter>
    </Fragment>
  );
};
export default LoginPage;
