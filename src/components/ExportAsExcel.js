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

  // console.log(infoTributaria);

  let factura = estab && ptoEmi ? estab + "-" + ptoEmi + "-" : null;

  let facturaNumero = factura + secuencial;

  return {
    FECHA: `${parseDate}`,
    MES: `${parseMonth}`,
    "N° DE FACTURA": `${facturaNumero}`,
    "RUC PROVEEDOR": `'${ruc}`,
    PROVEDOR: `${
      empresaNombre !== null && empresaNombre !== undefined
        ? empresaNombre.replace("&amp;", "&")
        : razonSocial
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
            className="btn btn-primary"
          >
            Save as
          </CSVLink>
        ) : (
          <Button color="primary" disabled>
            Save as
          </Button>
        )}
      </Form>
    </div>
  );
};
export default ExportAsExcel;
