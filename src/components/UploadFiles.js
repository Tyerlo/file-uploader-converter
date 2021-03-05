import React, { Fragment, useCallback, useState } from "react";
import "./UploadFiles.css";
import { useDropzone } from "react-dropzone";
import ExportAsExcel from "./ExportAsExcel";

const XMLParser = require("react-xml-parser");

const UploadFiles = () => {
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const allFiles = [...fileNames, ...acceptedFiles];
    setFileNames(allFiles);

    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        const input = reader.result;

        const regex = /<\!\[CDATA\[|\]\]>/g;
        const xml = input.replace(regex, "");
        let parseXML = new XMLParser().parseFromString(xml);

        setFiles(parseXML);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 2,
    accept: "text/xml"
  });

  return (
    <Fragment>
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} name="files" />
          <p>Drag n' drop some files here, or click to select files</p>
          <em>(2 files are the maximum number of files you can drop here)</em>
        </div>

        <aside>
          <h4>Files</h4>
          <ul>
            {fileNames.map((file) => (
              <li key={file.path}>{file.path}</li>
            ))}
            {/* {Object.keys(files).map((file) => {
              return <li>{file}</li>;
            })} */}
          </ul>
        </aside>
      </section>
    </Fragment>
  );
};
export default UploadFiles;
