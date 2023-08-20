import React from "react";
import ShoppingCart from "../../components/public/shop/shoppingCart";
import Head from "next/head";

function Cart() {
  return (
    <>
      <Head>
        <title>ایباکس - سبد خرید</title>
      </Head>
      <ShoppingCart />
    </>
  );
}

export default Cart;
