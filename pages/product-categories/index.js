import React from "react";
import ContactForm from "../../components/public/forms/ContactForm";
import Head from "next/head";
import ProductCategories from "../../components/public/shop/productCategories";
function ProductCategoriesPage({ categories }) {
  return (
    <>
      <Head>
        <title>ایباکس - محصولات</title>
      </Head>
      <ProductCategories categories={categories} />
    </>
  );
}

export default ProductCategoriesPage;

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/`);
  const categories = await res.json();

  return { props: { categories } };
};
