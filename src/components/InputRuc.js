import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Card,
  CardBody
} from "reactstrap";
import { Formik } from "formik";
import { Fragment } from "react";
import { validateRuc, initialRuc } from "../util/ValidateRuc";

import { firebaseErrors } from "../context/firebaseErrors";
import firebase from "gatsby-plugin-firebase";

import RucFields from "./RucFields";
const InputRuc = ({ user, planRuc }) => {
  const [modal, setModal] = useState(false);

  const [data, setData] = useState({
    error: null,
    formSent: false,
    working: false
  });

  const toggle = () => setModal(!modal);

  const handleSubmit = async (values) => {
    //TODO fix so it adds the ruc to exisiting database
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("subscriptions")
      .add(
        {
          ruc: [values.ruc, values.ruc2, values.ruc3, values.ruc4, values.ruc5]
        },
        { merge: true }
      );
  };
  const rucPlan =
    planRuc.items !== undefined &&
    planRuc.items.map((item) => item.price.product.metadata.premium);

  return (
    <div>
      <Formik
        validationSchema={validateRuc}
        initialValues={{
          selectRuc: rucPlan.toString(),
          ruc: "",
          ruc2: "",
          ruc3: "",
          ruc4: "",
          ruc5: ""
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        enableReinitialize
      >
        {(props) => (
          <Fragment>
            {user && (
              <button
                disabled={!user}
                className="btn btn--dark"
                onClick={toggle}
              >
                Registrar ruc
              </button>
            )}

            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Registrar su ruc</ModalHeader>
              <ModalBody>
                <Card>
                  <CardBody>
                    <Form onSubmit={props.handleSubmit}>
                      <RucFields props={props} planRuc={planRuc} />
                    </Form>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="btn btn--dark"
                  onClick={props.handleSubmit}
                >
                  Registrar
                </button>
                <button className="btn btn--dark" onClick={toggle}>
                  Cancelar
                </button>
              </ModalFooter>
            </Modal>
          </Fragment>
        )}
      </Formik>
    </div>
  );
};

export default InputRuc;
