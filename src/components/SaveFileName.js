import { Modal, ModalBody, ModalFooter, ModalHeader, Input } from "reactstrap";
import React, { useState } from "react";
import ExportAsExcel from "./ExportAsExcel";
import { Formik } from "formik";
import * as Yup from "yup";
import { Fragment } from "react";

const SaveFileName = ({ data, setFilesUpload, setFileContent }) => {
  const [modal, setModal] = useState(false);

  const [charLeft] = useState(25);

  const toggle = () => setModal(!modal);

  const validationSchema = Yup.object({
    fileName: Yup.string().required("Filename can't be empty")
  });
  const intialValues = {
    fileName: ""
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  const clearForm = () => {
    setFilesUpload([]);
    setFileContent([]);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <Formik validationSchema={validationSchema} initialValues={intialValues}>
        {(props) => (
          <Fragment>
            <button className="btn--dark" onClick={clearForm}>
              Reset
            </button>
            <button className="btn--dark" onClick={toggle}>
              Download
            </button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Name the file</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  name="fileName"
                  minLength={1}
                  onChange={props.handleChange}
                  value={props.values.fileName}
                  onKeyDown={handleKeyDown}
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
                <p className="float-right">
                  {props.values.fileName.length}/{charLeft}
                </p>
              </ModalBody>
              <ModalFooter>
                <ExportAsExcel
                  setFileContent={setFileContent}
                  setFilesUpload={setFilesUpload}
                  setModal={setModal}
                  data={data}
                  handleSubmit={props.handleSubmit}
                  fileName={props.values.fileName}
                  modal={modal}
                />
                <button className="btn--dark" onClick={toggle}>
                  Cancel
                </button>
              </ModalFooter>
            </Modal>
          </Fragment>
        )}
      </Formik>
    </div>
  );
};
export default SaveFileName;
