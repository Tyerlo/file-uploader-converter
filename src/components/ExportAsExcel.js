import React from "react";
import dateFormat from "dateformat";
import { CSVLink } from "react-csv";
import { Form, Button } from "reactstrap";

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

  const infoFactura = file
    ? (((file.autorizacion || {}).comprobante || {}).factura || {})
        .infoFactura || {}
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

  let subTotal = infoFactura
    ? ((infoFactura || {}).totalSinImpuestos || {})._text || {}
    : null;

  let tarifa = infoFactura
    ? (
        (((infoFactura || {}).totalConImpuestos || {}).totalImpuesto || {})
          .tarifa || {}
      )._text
    : null;

  let valor = infoFactura
    ? (
        (((infoFactura || {}).totalConImpuestos || {}).totalImpuesto || {})
          .valor || {}
      )._text
    : null;

  let total = infoFactura
    ? ((((infoFactura || {}).pagos || {}).pago || {}).total || {})._text
    : null;

  let factura = estab && ptoEmi ? estab + "-" + ptoEmi + "-" : null;

  let facturaNumero = factura + secuencial;

  let importeTotal = infoFactura
    ? ((infoFactura || {}).importeTotal || {})._text || {}
    : null;

  return {
    FECHA: `${parseDate}`,
    MES: `${parseMonth}`,
    "N° DE FACTURA": `${facturaNumero}`,
    "RUC PROVEEDOR": `'${ruc}`,
    PROVEDOR: `${
      empresaNombre !== null && empresaNombre !== undefined
        ? empresaNombre.replace("&amp;", "&")
        : razonSocial
    }`,
    SUBTOTAL: `${subTotal !== null && subTotal !== undefined ? subTotal : 0}`,
    "12%": `${valor !== null && valor !== undefined ? valor : 0}`,
    "0%": `${tarifa !== null && tarifa !== undefined ? tarifa : 0}`,
    TOTAL: `${
      total !== null && total !== undefined
        ? total
        : importeTotal !== null && importeTotal !== undefined
        ? importeTotal
        : 0
    }`
  };
}

const ExportAsExcel = ({
  data,
  fileName,
  setModal,
  handleSubmit,
  setFilesUpload,
  setFileContent
}) => {
  const clearForm = () => {
    setFilesUpload([]);
    setFileContent([]);
    setModal((closeModal) => !closeModal);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {fileName.length > 0 ? (
          <CSVLink
            onClick={() => {
              return clearForm();
            }}
            filename={fileName}
            type="submit"
            enclosingCharacter={`"`}
            separator={";"}
            data={data.map((file) => {
              return transformData(file);
            })}
            className="btn--dark"
          >
            Guardar
          </CSVLink>
        ) : (
          <button className="btn--dark" disabled>
            Guardar
          </button>
        )}
      </Form>
    </div>
  );
};
export default ExportAsExcel;
