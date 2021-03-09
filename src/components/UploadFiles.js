import React, { Fragment, useCallback, useState } from "react";
import "./UploadFiles.css";
import { useDropzone } from "react-dropzone";
import ExportAsExcel from "./ExportAsExcel";
const UploadFiles = () => {
  const [fileContent, setFileContent] = useState([]);
  const [files, setFilesUpload] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const allFiles = [...files, ...acceptedFiles];
    setFilesUpload(allFiles);

    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        var XMLParser = require("react-xml-parser");
        const input = reader.result;

        const regex = /<\!\[CDATA\[|\]\]>/g;
        const xml = input.replace(regex, "");
        let parseXML = new XMLParser().parseFromString(xml);

        setFileContent(parseXML);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 100,
    accept: "text/xml"
  });

  const fileName =
    files.length > 0 &&
    files.map((file) => {
      return file.name;
    });
  return (
    <Fragment>
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag n' drop some files here, or click to select files</p>
          <em>(100 files are the maximum number of files you can drop here)</em>
        </div>

        <aside>
          <h4>Files</h4>
          <ul>
            {fileName ? <li key={fileName + "-key"}>{fileName}</li> : null}
          </ul>
        </aside>
      </section>
      {typeof fileContent !== "undefined" &&
      fileContent &&
      fileContent.children ? (
        <ExportAsExcel data={fileContent.children} fileName={fileName} />
      ) : null}
    </Fragment>
  );
};
export default UploadFiles;
