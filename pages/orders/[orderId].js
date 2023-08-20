import React from "react";
import UserOrderPage from "../../components/public/user/UserOrderPage";
import { getCookie } from "cookies-next";

function Order({ order }) {
  return <UserOrderPage order={order} />;
}

export default Order;

export const getServerSideProps = async ({ req, res, params }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.orderId}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );
  const order = await response.json();

  return { props: { order: order[0] } };
};
