import React from "react";
// import ReactExport from "react-export-excel";
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportAsExcel = (props) => {
  console.log(props.data);
  return (
    <div></div>
    // <ExcelFile element={<button>Download excel</button>}>
    //   <ExcelSheet data={props} name="Employees">
    //     <ExcelColumn label="Name" value="name" />
    //   </ExcelSheet>
    // </ExcelFile>
  );
};
export default ExportAsExcel;
