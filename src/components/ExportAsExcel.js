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
function transformData(file) {
  let date = file
    ? ((file.autorizacion || {}).fechaAutorizacion || {})._text
    : null;

  let parseDate = dateFormat(date, "dd/mm/yyyy");
  let parseMonth = dateFormat(date, "mmmm");

  const infoTributaria = file
    ? (((file.autorizacion || {}).comprobante || {}).factura || {})
        .infoTributaria || {}
    : null;

  let estab = infoTributaria
    ? ((infoTributaria || {}).estab || {})._text || {}
    : null;
  let ptoEmi = infoTributaria
    ? ((infoTributaria || {}).ptoEmi || {})._text || {}
    : null;
  let secuencial = infoTributaria
    ? ((infoTributaria || {}).secuencial || {})._text || {}
    : null;

  let ruc = infoTributaria
    ? ((infoTributaria || {}).ruc || {})._text || {}
    : null;
  let empresaNombre = infoTributaria
    ? ((infoTributaria || {}).nombreComercial || {})._text || null
    : null;

  let razonSocial = infoTributaria
    ? ((infoTributaria || {}).razonSocial || {})._text || {}
    : null;

  console.log(infoTributaria);

  let factura = estab + "-" + ptoEmi + "-";

  let facturaNumero = factura + secuencial;
  console.log(empresaNombre);
  return {
    FECHA: `${parseDate}`,
    MES: `${parseMonth}`,
    "N° DE FACTURA ": `${facturaNumero}`,
    "RUC PROVEEDOR": `${ruc}`,
    PROVEDOR: `${
      empresaNombre !== null && empresaNombre !== undefined
        ? empresaNombre.replace("&amp;", "&")
        : razonSocial
    }`
  };
}

const ExportAsExcel = ({ data }) => {
  //TODO fix so it can read all files and download it correctly.
  //TODO fix so it can print correct data in correct column

  return (
    <div className="d-flex justify-content-center align-items-center">
      <CSVLink
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
