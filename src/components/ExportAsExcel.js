import React from "react";
import { CSVDownloader } from "react-papaparse";
import dateFormat from "dateformat";
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
function extractToString(conVertString) {
  return conVertString.toString();
}

function splitFactura(estabToString, ptoEmiToString) {
  return estabToString + "-" + ptoEmiToString + "-";
}

const ExportAsExcel = ({ data }) => {
  let date = (data || {}).autorizacion;
  let fecha = (date || {}).fechaAutorizacion;
  let fechaText = (fecha || {})._text;

  let parseDate = dateFormat(fechaText, "dd/mm/yyyy");
  let parseMonth = dateFormat(fechaText, "mmmm");

  //TODO fix so it can read all files and download it correctly.
  //TODO fix so it can print correct data in correct column

  // let factura = splitFactura(estabToString, ptoEmiToString);

  // let facturaNumero = factura + secuencial;

  // let empresaNombre = nombreComercial.toString().replace("&amp;", "&");

  return (
    <div className="d-flex justify-content-center align-items-center">
      <CSVDownloader
        // data={[
        //   {
        //     FECHA: parseDate,
        //     MES: parseMonth,
        //     "N° DE FACTURA": facturaNumero,
        //     "RUC PROVEDOR": numeroRuc.toString(),
        //     PROVEDOR: empresaNombre
        //   }
        // ]}
        filename="filename"
        type="button"
        className="btn btn-primary"
        bom="true"
      >
        Download
      </CSVDownloader>
    </div>
  );
};
export default ExportAsExcel;
