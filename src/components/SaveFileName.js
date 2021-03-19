import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input
} from "reactstrap";
import React, { useState } from "react";
import ExportAsExcel from "./ExportAsExcel";
import { Formik } from "formik";
import * as Yup from "yup";
import { Fragment } from "react";

const SaveFileName = ({ props, data }) => {
  const [modal, setModal] = useState(false);

  const [charLeft, setCharsLeft] = useState(25);

  const toggle = () => setModal(!modal);

  const validationSchema = Yup.object({
    fileName: Yup.string().required("Filename can't be empty")
  });
  const intialValues = {
    fileName: ""
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={intialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <Fragment>
            <Button color="primary" onClick={toggle}>
              Download
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Name the file</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  name="fileName"
                  minLength={1}
                  onChange={props.handleChange}
                  value={props.values.fileName}
                  onBlur={props.handleBlur}
                  maxLength={25}
                  placeholder="Name the file"
                />
                {props.errors.fileName && props.touched.fileName ? (
                  <div className="text-danger">
                    <i className="fas fa-times mr-1" />
                    {props.errors.fileName}
                  </div>
                ) : null}
                <p>
                  {props.values.fileName.length}/{charLeft}
                </p>
              </ModalBody>
              <ModalFooter>
                <ExportAsExcel
                  data={data}
                  handleSubmit={props.handleSubmit}
                  fileName={props.values.fileName}
                  modal={modal}
                />
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Fragment>
        )}
      </Formik>
    </div>
  );
};
export default SaveFileName;
