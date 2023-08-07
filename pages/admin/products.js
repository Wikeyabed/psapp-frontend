import React, { useState, useEffect } from "react";
import ProductsList from "../../components/admin/products";
import { getCookie } from "cookies-next";

export default function Products({ products }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [products]);
  return (
    <>
      {loading ? (
        <p>در حال بارگذاری...</p> // Show a loading message until the products are loaded
      ) : (
        <ProductsList products={products} />
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const prods = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  const products = await prods.json();

  return {
    props: {
      products,
    },
  };
}
