import dateFormat from "dateformat";

export function transformData(file) {
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

  let total = infoFactura
    ? ((((infoFactura || {}).pagos || {}).pago || {}).total || {})._text
    : null;

  let factura = estab && ptoEmi ? estab + "-" + ptoEmi + "-" : null;

  let facturaNumero = factura + secuencial;

  let importeTotal = infoFactura
    ? ((infoFactura || {}).importeTotal || {})._text || {}
    : null;

  const iva = subTotal * 0.12;

  const subTotalSinIva = Number(total) - Number(subTotal) - Number(iva);

  const subImporteTotalSinIva =
    Number(importeTotal) - Number(subTotal) - Number(iva);

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
    "SUBTOTAL CON IVA": `${
      subTotal !== null && subTotal !== undefined ? subTotal : 0
    }`,
    "IVA 12%": `${
      Number(subTotal) === Number(total) ||
      Number(subTotal) === Number(importeTotal)
        ? 0
        : subTotal !== null && subTotal !== undefined
        ? Number(iva).toFixed(2)
        : 0
    }`,
    "SUBTOTAL SIN IVA": `${
      Number(subTotal) === Number(total) ||
      Number(subTotal) === Number(importeTotal)
        ? total
        : importeTotal
        ? subTotal !== null &&
          subTotal !== undefined &&
          total !== null &&
          total !== undefined &&
          importeTotal !== null &&
          importeTotal !== undefined
          ? Number(subTotalSinIva).toFixed(2)
          : Number(subImporteTotalSinIva).toFixed(2)
        : 0
    }`,
    "VALOR TOTAL": `${
      total !== null &&
      total !== undefined &&
      importeTotal !== null &&
      importeTotal !== undefined
        ? total
        : importeTotal
    }`
  };
}
