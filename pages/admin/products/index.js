import React, { useState, useEffect } from "react";
import ProductsList from "../../../components/admin/products";
import { getCookie } from "cookies-next";

export default function Products({ products, categories }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [products]);
  return (
    <>
      {loading ? (
        <p>در حال بارگذاری...</p> // Show a loading message until the products are loaded
      ) : (
        <ProductsList categories={categories} products={products} />
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const prods = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const cats = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);

  const products = await prods.json();
  const categories = await cats.json();

  return {
    props: {
      products,
      categories,
    },
  };
}
