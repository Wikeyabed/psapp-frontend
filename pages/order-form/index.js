import React from "react";
import OrderProductForm from "../../components/public/forms/OrderProductForm";
import Head from "next/head";
function OrderProduct() {
  return (
    <>
      <Head>
        <title>ایباکس - فرم سفارش محصول</title>
      </Head>
      <OrderProductForm />
    </>
  );
}

export default OrderProduct;
