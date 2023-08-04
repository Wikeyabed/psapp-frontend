import InvoiceList from "../../../components/admin/invoices";
import { getCookie } from "cookies-next";
function Invoices({ invoices }) {
  return <InvoiceList invoices={invoices} />;
}

export default Invoices;

export async function getServerSideProps({ req, res }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/`, {
    headers: {
      token: getCookie("x-auth-token", { req, res }),
    },
  });

  const invoices = await response.json();

  console.log(invoices);

  return {
    props: {
      invoices,
    },
  };
}
