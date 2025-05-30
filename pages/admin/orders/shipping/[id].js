import { getCookie } from "cookies-next";
import ShippingPdf from "../../../../components/admin/orders/ShippingPdf";

function Shipping({ order }) {
  return (
    <>
      <ShippingPdf order={order} />
    </>
  );
}

export default Shipping;

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
