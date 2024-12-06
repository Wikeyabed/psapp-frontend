import AdminOrderPdf from "../../../../components/admin/orders/AdminOrderPdf";
import { getCookie } from "cookies-next";

function AdminPrint({ order }) {
  return (
    <>
      <AdminOrderPdf order={order} />
    </>
  );
}

export default AdminPrint;

export async function getServerSideProps({ req, res, params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const order = await response.json();

  console.log(order);

  return {
    props: {
      order: order[0],
    },
  };
}
