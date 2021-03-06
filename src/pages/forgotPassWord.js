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
  Alert,
  Spinner
} from "reactstrap";
import firebase from "gatsby-plugin-firebase";
import { firebaseErrors } from "../context/firebaseErrors";
const ForgotPassWord = ({ passModal, passToggle, loading }) => {
  const [data, setData] = useState({
    email: "",
    error: "",
    formSent: false,
    working: false
  });

  const handleSendReset = async (event) => {
    event.preventDefault();
    if (data.email) {
      setData({ ...data, working: true });

      await firebase
        .auth()
        .sendPasswordResetEmail(data.email)
        .then(() => {
          setData({ ...data, formSent: true, working: false });
        })
        .catch((err) => {
          setData({
            ...data,
            error: firebaseErrors[err.code] || err.message,
            working: false
          });
        });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Modal
        contentClassName="modalDialog"
        isOpen={passModal}
        toggle={passToggle}
      >
        <ModalHeader toggle={passToggle}>
          <div className="heading-list">
            <header className="heading-list--list">
              Recuperar su contraseña
            </header>
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
              Una correo has enviado para cambiar su contraseña
            </Alert>
          ) : (
            <Card>
              <CardBody>
                <Form onSubmit={handleSendReset}>
                  <FormGroup>
                    <Label style={{ fontSize: "1.5rem" }} for="email">
                      Correo
                    </Label>
                    <Input
                      required
                      onChange={handleChange}
                      style={{ fontSize: "1.5rem" }}
                      type="email"
                      value={data.email}
                      name="email"
                    />
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
        {data.formSent ? null : (
          <ModalFooter>
            <Fragment>
              <button
                disabled={loading || !data.email}
                className="btn btn--dark"
                onClick={handleSendReset}
              >
                Enviar
              </button>
              <button className="btn btn--dark" onClick={passToggle}>
                Cancelar
              </button>
            </Fragment>
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};
export default ForgotPassWord;
