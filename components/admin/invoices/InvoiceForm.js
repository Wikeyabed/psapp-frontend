import React from "react";
import FormTile from "../layout/FormTile";
function InvoiceForm({ invoice }) {
  return (
    <>
      <FormTile title={`فاکتور شماره ${invoice.id}`} />
      فاکتور شماره {invoice.id}
    </>
  );
}

export default InvoiceForm;
