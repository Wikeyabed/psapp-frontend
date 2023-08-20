import InvoicePage from "../../../components/admin/invoices/invoicePage";
import { getCookie } from "cookies-next";

function Invoice({ invoice }) {
  return (
    <>
      <InvoicePage invoice={invoice} />
    </>
  );
}

export default Invoice;

export async function getServerSideProps({ req, res, params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const invoice = await response.json();

  console.log(invoice);

  return {
    props: {
      invoice: invoice[0],
    },
  };
}
