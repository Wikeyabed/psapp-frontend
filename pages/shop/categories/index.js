import { useDispatch } from "react-redux";
import {
  getProducts,
  setAllVariant,
} from "../../../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";
import Categories from "../../../components/public/shop/categories/index.js";

export default function CategoriesPage({ products, allVariants, categories }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // First group variants by their product_id
    const variantsByProductId = allVariants.reduce((acc, variant) => {
      const productId = variant.variant_product_id;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(variant);
      return acc;
    }, {});

    // Then create products array with all variants included
    const productsWithVariants = products.map((product) => ({
      info: product,
      variants: variantsByProductId[product.product_id] || [],
    }));

    console.log("Processed products with variants:", productsWithVariants);
    dispatch(getProducts(productsWithVariants));
    dispatch(setAllVariant(allVariants));
  }, [products, allVariants, dispatch]); // Added dependencies

  return (
    <>
      <Head>
        <title>ایباکس - دسته بندی ها</title>
      </Head>
      <Categories cats={categories} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch all data in parallel
    const [productsRes, variantsRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-variant`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/`),
    ]);

    // Check for errors
    if (!productsRes.ok || !variantsRes.ok || !categoriesRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const [products, allVariants, categories] = await Promise.all([
      productsRes.json(),
      variantsRes.json(),
      categoriesRes.json(),
    ]);

    return {
      props: {
        products,
        allVariants,
        categories,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        products: [],
        allVariants: [],
        categories: [],
      },
    };
  }
}
s