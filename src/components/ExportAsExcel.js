import React from "react";
import dateFormat from "dateformat";
import { CSVLink } from "react-csv";
import { Form } from "reactstrap";
import { transformData } from "./transformData";

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
const ExportAsExcel = ({
  data,
  fileName,
  setModal,
  handleSubmit,
  removeAll
}) => {
  const clearForm = () => {
    removeAll();
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
            filename={`${fileName}.csv`}
            type="submit"
            enclosingCharacter={`"`}
            separator={";"}
            data={data.map((file) => {
              return transformData(file);
            })}
            className="btn btn--dark"
          >
            Guardar
          </CSVLink>
        ) : (
          <button className="btn btn--dark" disabled>
            Guardar
          </button>
        )}
      </Form>
    </div>
  );
};
export default ExportAsExcel;
