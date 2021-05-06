import React, { useState, Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner
} from "reactstrap";
import firebase from "gatsby-plugin-firebase";
import useAuthState from "../context/auth";
import { Formik } from "formik";
import { validateSchema, initialValues } from "../util/ValidationFormik";
import { firebaseErrors } from "../context/firebaseErrors";
import CardRegister from "../components/CardRegister";
import dateFormat from "dateformat";

const Register = ({ toggle, modal }) => {
  const [data, setData] = useState({
    error: null,
    formSent: false,
    working: false
  });

  const [user, loading, error] = useAuthState(firebase);
  let now = new Date();
  let dateCreated = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

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

        firebase
          .firestore()
          .collection("users")
          .add({
            uid: user.uid,
            email: user.email,
            ruc: [
              values.ruc,
              values.ruc2,
              values.ruc3,
              values.ruc4,
              values.ruc5
            ],
            selectedRucs: values.selectRuc,
            createdAt: dateCreated
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
                <CardRegister props={props} />
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
