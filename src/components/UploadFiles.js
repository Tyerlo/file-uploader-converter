import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SaveFileName from "./SaveFileName";
import { Container, Row, Col } from "reactstrap";
import { Fragment } from "react";

const readFileContents = (file, setFileContent) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      const files = event.target.result;

      var convert = require("xml-js");
      const regex = /<\!\[CDATA\[|\]\]>/g;
      const xml = files.replace(regex, "");
      let result = convert.xml2json(xml, { compact: true, spaces: 4 });

      setFileContent((values) => values.concat(JSON.parse(result)));
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.onabort = reject;
    reader.readAsText(file);
  });
};
//TODO fix an progress bar on the percent
const readAllFiles = async (allFiles, setFileContent) => {
  const results = await Promise.all(
    allFiles.map(async (file) => {
      return await readFileContents(file, setFileContent);
    })
  );

  return results;
};

const UploadFiles = () => {
  const [fileContent, setFileContent] = useState([]);
  const [files, setFilesUpload] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const allFiles = [...files, ...acceptedFiles];
    setFilesUpload(allFiles);

    return readAllFiles(allFiles, setFileContent);
  }, []);

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 100,
    accept: "text/xml"
  });
  const twoColumns = Math.floor(files.length / 2);

  return (
    <Fragment>
      <section className="section-upload">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />

          <p>Drag n' drop some files here, or click to select files</p>
          <em>(100 files are the maximum number of files you can drop here)</em>
        </div>
        <em>(Only *.xml will be accepted)</em>
        <aside>
          {fileRejections.length > 100 ? (
            <p className="text-danger">
              <i className="fas fa-times mr-1" />
              You have uploaded more than {fileRejections.length} files, the
              limit is only 100 files files to upload
            </p>
          ) : null}
        </aside>
      </section>
      <section>
        <h4>List of files</h4>
        <div className="list">
          <ul>
            {files.slice(0, twoColumns).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>

          <ul>
            {files.slice(twoColumns).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>

        {typeof fileContent !== "undefined" && fileContent.length > 0 ? (
          <SaveFileName
            data={fileContent}
            setFilesUpload={setFilesUpload}
            setFileContent={setFileContent}
          />
        ) : null}
      </section>
    </Fragment>
  );
};
export default UploadFiles;
