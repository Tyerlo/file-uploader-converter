import React from "react";
import { CSVDownloader } from "react-papaparse";

const ExportAsExcel = ({ data, fileName }) => {
  console.log(data.map((fieldsName) => fieldsName.value));

  let date = data.map((fieldsName) => fieldsName.value);
  let fecha = date[2];
  console.log(fecha);
  //console.log(data.children.map((fieldsName) => fieldsName));
  // console.log(fileName);
  return (
    <CSVDownloader data={[{ FECHA: fecha }]} type="button" bom="true">
      Download
    </CSVDownloader>
  );
};
export default ExportAsExcel;
