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
  const date = file.autorizacion.fechaAutorizacion._text;
  let parseDate = dateFormat(date, "dd/mm/yyyy");
  let parseMonth = dateFormat(date, "mmmm");

  const infoTributaria = file.autorizacion.comprobante.factura.infoTributaria;
  let estab = infoTributaria.estab._text;
  let ptoEmi = infoTributaria.ptoEmi._text;
  let secuencial = infoTributaria.secuencial._text;

  console.log(infoTributaria);
  let ruc = infoTributaria.ruc._text;
  let empresaNombre = infoTributaria.nombreComercial._text;

  let nombreComercial = empresaNombre.replace("&amp;", "&");

  let factura = estab + "-" + ptoEmi + "-";

  let facturaNumero = factura + secuencial;

  return {
    FECHA: `${parseDate}`,
    MES: `${parseMonth}`,
    "N° DE FACTURA ": `${facturaNumero}`,
    "RUC PROVEEDOR": `${ruc}`,
    PROVEDOR: `${nombreComercial}`
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
