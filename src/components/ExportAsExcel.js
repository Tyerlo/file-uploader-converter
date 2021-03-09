import React from "react";
import { CSVDownloader } from "react-papaparse";

const ExportAsExcel = ({ data, fileName }) => {
  let date = data.map((fieldsName) => fieldsName.value);

  let fecha = date[2];

  let input = fileName.toString();

  let splitFileName = input.split(".");

  return (
    <CSVDownloader
      data={[{ FECHA: fecha }]}
      filename={splitFileName[0]}
      type="button"
      bom="true"
    >
      Download
    </CSVDownloader>
  );
};
export default ExportAsExcel;
