import React, { useState, useEffect } from "react";
import ProductsList from "../../components/admin/products";

export default function Products({ products }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [products]);
  return (
    <>
      {loading ? (
        <p>Loading products...</p> // Show a loading message until the products are loaded
      ) : (
        <ProductsList products={products} />
      )}
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
