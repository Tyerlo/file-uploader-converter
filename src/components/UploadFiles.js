import React, { Fragment, useCallback, useState } from "react";
import "./UploadFiles.css";
import { useDropzone } from "react-dropzone";
import ExportAsExcel from "./ExportAsExcel";

const readFileContents = (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.onabort = reject;
    reader.readAsText(file);
  });
};
//TODO fix so it can read all files uploading
const readAllFiles = async (allFiles, setFileContent) => {
  const results = await Promise.all(
    allFiles.map(async (file) => {
      return await readFileContents(file);
    })
  );

  var XMLParser = require("react-xml-parser");

  const input = results.toString();

  const regex = /<\!\[CDATA\[|\]\]>/g;
  const xml = input.replace(regex, "");
  let parseXML = new XMLParser().parseFromString(xml);
  console.log(input);
  setFileContent(parseXML);
};

const UploadFiles = () => {
  const [fileContent, setFileContent] = useState([]);
  const [files, setFilesUpload] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const allFiles = [...files, ...acceptedFiles];
    setFilesUpload(allFiles);

    return readAllFiles(allFiles, setFileContent);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 100,
    accept: "text/xml"
  });

  const fileName =
    files.length > 0 &&
    files.map((file) => {
      return <li key={file.path + "-key"}>{file.name}</li>;
    });
  return (
    <Fragment>
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />

          <p>Drag n' drop some files here, or click to select files</p>
          <em>(100 files are the maximum number of files you can drop here)</em>
        </div>
        <em>(Only *.xml will be accepted)</em>
        <aside>
          <h4>Files</h4>
          <ul>{fileName ? fileName : null}</ul>
        </aside>
      </section>
      {typeof fileContent !== "undefined" &&
      fileContent &&
      fileContent.children ? (
        <ExportAsExcel data={fileContent.children} />
      ) : null}
    </Fragment>
  );
};
export default UploadFiles;
