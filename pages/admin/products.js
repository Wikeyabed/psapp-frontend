import React, { useState, useEffect } from "react";
import ProductsList from "../../components/admin/products/ProductsList";

export async function getServerSideProps() {
  const response = await fetch("https://fakestoreapi.com/products");
  const productsData = await response.json();
  const modifiedProductsData = productsData.map((product) => ({
    id: product.id,
    name: product.title.slice(0, 5),
    image: `https://picsum.photos/id/${product.id * 10}/300/200`,
    category: product.category,
  }));

  return {
    props: {
      products: modifiedProductsData,
    },
  };
}

export default function Products({ products }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  console.log("from server", products);
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
