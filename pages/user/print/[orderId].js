import React from "react";
import UserOrderPage from "../../../components/public/user/UserOrderPage";
import { getCookie } from "cookies-next";
import Head from "next/head";
import OrderPdf from "../../../components/public/user/OrderPdf";

function PrintOrder({ order }) {
  return (
    <>
      <Head>
        <title>ایباکس - فاکتور شماره {order.order_number} </title>
      </Head>
      <OrderPdf order={order} />
    </>
  );
}

export default PrintOrder;

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

  console.log(order);

  return { props: { order: order[0] } };
};
