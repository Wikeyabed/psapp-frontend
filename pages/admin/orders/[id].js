import OrderPage from "../../../components/admin/orders/OrderPage";
import { getCookie } from "cookies-next";

function Order({ order }) {
  return (
    <>
      <OrderPage order={order} />
    </>
  );
}

export default Order;

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
