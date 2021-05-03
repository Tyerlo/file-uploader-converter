import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import SaveFileName from "./SaveFileName";
import { Fragment } from "react";
import { readAllFiles } from "../util/ReadFiles";
import firebase from "gatsby-plugin-firebase";

const UploadFiles = () => {
  const [fileContent, setFileContent] = useState([]);
  const [files, setFilesUpload] = useState([]);
  const [users, setUsers] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const allFiles = [...files, ...acceptedFiles];
      setFilesUpload(allFiles);

      return readAllFiles(allFiles, setFileContent);
    },
    [files]
  );

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 100,
    accept: "text/xml"
  });

  const removeAll = () => {
    setFileContent([]);
    setFilesUpload([]);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = firebase.firestore().collection("users");
      const data = await response.get();

      data.forEach((items) => {
        setUsers({ ...items.data() });
      });
    };
    fetchUsers();
  }, []);

  const ruc = fileContent.map((file) =>
    file
      ? (
          (
            (((file.autorizacion || {}).comprobante || {}).factura || {})
              .infoTributaria || {}
          ).ruc || {}
        )._text || {}
      : null
  );

  const isRucSame = () => {
    if (ruc.every((item) => users.ruc.includes(item))) {
      return true;
    }

    if (ruc.filter((item) => !users.ruc.includes(item))) {
      return false;
    }
  };

  const isValidRuc = ruc.filter((item) => !users.ruc.includes(item));
  return (
    <Fragment>
      <section className="section-upload">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />

          <p>
            <span className="icon">
              <i className="fas fa-file-upload"></i>
            </span>
          </p>
          <em>Subir archivos *.xml</em>
        </div>
        <em></em>
      </section>
      <section className="section-listing">
        {fileRejections.length > 100 ? (
          <div className="heading-list">
            <h4 className="heading-list--list">
              <p className="text-danger">
                <i className="fas fa-times mr-1" />
                Subiste {fileRejections.length} archivos. maximo permitido 100
                archivos
              </p>
            </h4>
          </div>
        ) : null}

        {files.length > 0 && isRucSame() === true ? (
          <Fragment>
            <div className="heading-list">
              <h4 className="heading-list--list">
                Subiste {files.length} archivo
              </h4>
            </div>
            <div className="list">
              <ul>
                {ruc.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
            </div>
          </Fragment>
        ) : files.length > 0 && isRucSame() === false ? (
          <Fragment>
            <p className="text-danger">
              <i className="fas fa-times mr-1" />
              El archivo no corresponde al registrado
              <li>{isValidRuc}</li>
            </p>
            <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
              <button className=" btn btn--dark" onClick={removeAll}>
                Borrar
              </button>
            </div>
          </Fragment>
        ) : null}
        {typeof fileContent !== "undefined" &&
        fileContent.length > 0 &&
        isRucSame() === true ? (
          <SaveFileName
            files={files}
            data={fileContent}
            removeAll={removeAll}
          />
        ) : null}
      </section>
    </Fragment>
  );
};
export default UploadFiles;
