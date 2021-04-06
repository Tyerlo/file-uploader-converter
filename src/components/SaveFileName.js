import { Modal, ModalBody, ModalFooter, ModalHeader, Input } from "reactstrap";
import React, { useState } from "react";
import ExportAsExcel from "./ExportAsExcel";
import { Formik } from "formik";
import * as Yup from "yup";
import { Fragment } from "react";

const SaveFileName = ({ data, files, removeAll }) => {
  const [modal, setModal] = useState(false);

  const [charLeft] = useState(25);

  const toggle = () => setModal(!modal);

  const validationSchema = Yup.object({
    fileName: Yup.string().required("Nombre archivo no puede estar vacio")
  });
  const intialValues = {
    fileName: ""
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
      <Formik validationSchema={validationSchema} initialValues={intialValues}>
        {(props) => (
          <Fragment>
            {data.length > 0 && (
              <button className="btn btn--dark" onClick={toggle}>
                Descargar
              </button>
            )}

            {files.length > 0 && (
              <button className=" btn btn--dark" onClick={removeAll}>
                Reiniciar
              </button>
            )}
            <Modal style={{ fontSize: "2rem" }} isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>
                <div className="heading-list">
                  <header className="heading-list--list">
                    Nombrar el archivo
                  </header>
                </div>
              </ModalHeader>
              <ModalBody style={{ fontSize: "2rem" }}>
                <Input
                  style={{ fontSize: "2rem" }}
                  type="text"
                  name="fileName"
                  minLength={1}
                  onChange={props.handleChange}
                  value={props.values.fileName}
                  onKeyDown={handleKeyDown}
                  onBlur={props.handleBlur}
                  maxLength={25}
                  placeholder=" Nombrar el archivo"
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
                  removeAll={removeAll}
                  setModal={setModal}
                  data={data}
                  handleSubmit={props.handleSubmit}
                  fileName={props.values.fileName}
                  modal={modal}
                />
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
export default SaveFileName;
