import OrderList from "../../../components/admin/orders";
import { getCookie } from "cookies-next";
function Orders({ orders }) {
  return <OrderList orders={orders} />;
}

export default Orders;

export async function getServerSideProps({ req, res }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
    headers: {
      token: getCookie("x-auth-token", { req, res }),
    },
  });

  const orders = await response.json();

  console.log("orders", orders);

  return {
    props: {
      orders,
    },
  };
}
