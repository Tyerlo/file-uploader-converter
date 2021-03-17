import React from "react";
import dateFormat from "dateformat";
import { CSVLink } from "react-csv";
dateFormat.i18n = {
  monthNames: [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE"
  ]
};
// function extractToString(conVertString) {
//   return conVertString.toString();
// }

// function splitFactura(estabToString, ptoEmiToString) {
//   return estabToString + "-" + ptoEmiToString + "-";
// }
function transformData(file) {
  const date = file.autorizacion.fechaAutorizacion._text;
  let parseDate = dateFormat(date, "dd/mm/yyyy");
  let parseMonth = dateFormat(date, "mmmm");

  return {
    FECHA: `${parseDate}`,
    MES: `${parseMonth}`
  };
}

const ExportAsExcel = ({ data }) => {
  //TODO fix so it can read all files and download it correctly.
  //TODO fix so it can print correct data in correct column

  // let factura = splitFactura(estabToString, ptoEmiToString);

  // let facturaNumero = factura + secuencial;

  // let empresaNombre = nombreComercial.toString().replace("&amp;", "&");

  return (
    <div className="d-flex justify-content-center align-items-center">
      <CSVLink
        // headers={headers}
        data={data.map((file) => {
          return transformData(file);
        })}
        className="btn btn-primary"
      >
        Download
      </CSVLink>
    </div>
  );
};
export default ExportAsExcel;
