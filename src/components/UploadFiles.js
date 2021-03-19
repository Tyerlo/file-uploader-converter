import React, { Fragment, useCallback, useState } from "react";
import "./UploadFiles.css";
import { useDropzone } from "react-dropzone";
import ExportAsExcel from "./ExportAsExcel";
import SaveFileName from "./SaveFileName";

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 100,
    accept: "text/xml"
  });

  const fileName =
    files.length > 0 &&
    files.map((file) => {
      return <li key={file.name + "-key"}>{file.name}</li>;
    });

  console.log(fileContent);
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

      {typeof fileContent !== "undefined" && fileContent.length > 0 ? (
        <SaveFileName data={fileContent} />
      ) : null}
    </Fragment>
  );
};
export default UploadFiles;
