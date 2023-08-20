import React from "react";
import CheckoutToPayment from "../../components/public/shop/pay/Checkout";
import Head from "next/head";

function Checkout() {
  return (
    <>
      <Head>
        <title>ایباکس - تایید نهایی پرداخت</title>
      </Head>
      <CheckoutToPayment />
    </>
  );
}

export default Checkout;
