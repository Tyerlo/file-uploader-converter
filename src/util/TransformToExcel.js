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

  let total = infoFactura
    ? ((((infoFactura || {}).pagos || {}).pago || {}).total || {})._text
    : null;

  let factura = estab && ptoEmi ? estab + "-" + ptoEmi + "-" : null;

  let facturaNumero = factura + secuencial;

  let importeTotal = infoFactura
    ? ((infoFactura || {}).importeTotal || {})._text || {}
    : null;

  let baseImponible = infoFactura
    ? (
        (((infoFactura || {}).totalConImpuestos || {}).totalImpuesto || {})
          .baseImponible || {}
      )._text || {}
    : null;

  let iva12 = infoFactura
    ? (
        (((infoFactura || {}).totalConImpuestos || {}).totalImpuesto || {})
          .valor || {}
      )._text || {}
    : null;

  let multipleSubtotal =
    ((infoFactura || {}).totalConImpuestos || {}).totalImpuesto || {};

  let ivaCon12 =
    multipleSubtotal.length > 0
      ? multipleSubtotal
          .map((value) => value.valor._text)
          .filter((value) => value > 0)
      : iva12;

  let filterBaseImponible =
    multipleSubtotal.length > 0
      ? multipleSubtotal
          .map((value) => value)
          .filter((list) => list.valor._text > 0)
          .map((value) => value.baseImponible._text)
      : baseImponible;

  const subTotalSinIva =
    Number(total) - Number(filterBaseImponible) - Number(ivaCon12);

  const subImporteTotalSinIva =
    Number(importeTotal) - Number(filterBaseImponible) - Number(ivaCon12);

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
      Number(filterBaseImponible) === Number(total) ||
      Number(filterBaseImponible) === Number(importeTotal)
        ? 0
        : multipleSubtotal !== null && multipleSubtotal !== undefined
        ? Number(filterBaseImponible)
        : 0
    }`,
    "IVA 12%": `${
      Number(baseImponible) === Number(total) ||
      Number(baseImponible) === Number(importeTotal)
        ? 0
        : baseImponible !== null && baseImponible !== undefined
        ? Number(ivaCon12)
        : 0
    }`,
    "SUBTOTAL SIN IVA": `${
      Number(baseImponible) === Number(total) ||
      Number(baseImponible) === Number(importeTotal)
        ? total
        : importeTotal
        ? baseImponible !== null &&
          baseImponible !== undefined &&
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
