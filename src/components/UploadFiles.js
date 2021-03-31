import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SaveFileName from "./SaveFileName";
import { Fragment } from "react";
import { readAllFiles } from "../util/ReadFiles";

const UploadFiles = () => {
  const [fileContent, setFileContent] = useState([]);
  const [files, setFilesUpload] = useState([]);

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

  return (
    <Fragment>
      <section className="section-upload">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />

          <p>Drag n' drop some files here, or click to select files</p>
          <em>(100 files are the maximum number of files you can drop here)</em>
        </div>
        <em>(Only *.xml will be accepted)</em>
        <aside></aside>
      </section>
      <section className="section-listing">
        {fileRejections.length > 100 ? (
          <div className="heading-list">
            <h4 className="heading-list--list">
              <p className="text-danger">
                <i className="fas fa-times mr-1" />
                You have uploaded more than {fileRejections.length} files, the
                limit is only 100 files files to upload
              </p>
            </h4>
          </div>
        ) : null}
        {files.length > 0 ? (
          <Fragment>
            <div className="heading-list">
              <h4 className="heading-list--list">
                Subiste {files.length} filas
              </h4>
            </div>
            <div className="list">
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          </Fragment>
        ) : null}

        {typeof fileContent !== "undefined" && fileContent.length > 0 ? (
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
