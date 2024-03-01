import React from "react";
import ContactForm from "../../components/public/forms/ContactForm";
import Head from "next/head";
import ProductCategories from "../../components/public/shop/productCategories";
function ProductCategoriesPage() {
  return (
    <>
      <Head>
        <title>ایباکس - محصولات</title>
      </Head>
      <ProductCategories />
    </>
  );
}

export default ProductCategoriesPage;
