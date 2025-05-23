import Shop from "../components/public/shop";
import { useDispatch } from "react-redux";
import { getProducts, setAllVariant } from "../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";

export default function Home({ products, allVariants }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Create a mapping of variants by product ID
    const variantsByProductId = allVariants.reduce((acc, variant) => {
      const productId = variant.variant_product_id;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(variant);
      return acc;
    }, {});

    // Create complete product objects with all variants
    const productsWithVariants = products.map((product) => ({
      info: product,
      variants: variantsByProductId[product.product_id] || [],
    }));

    console.log("Products with variants:", productsWithVariants);
    dispatch(getProducts(productsWithVariants));
    dispatch(setAllVariant(allVariants));
  }, [products, allVariants, dispatch]);

  return (
    <>
      <Head>
        <title>
          ایباکس | مرجع خرید کارتن پستی، نایلون حبابدار، پاکت و سلفون با ارسال
          سریع
        </title>
      </Head>
      <Shop />
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch data in parallel
    const [productsRes, variantsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-variant`),
    ]);

    // Handle errors
    if (!productsRes.ok || !variantsRes.ok) {
      throw new Error("Failed to fetch product data");
    }

    const [products, allVariants] = await Promise.all([
      productsRes.json(),
      variantsRes.json(),
    ]);

    return {
      props: {
        products,
        allVariants,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        products: [],
        allVariants: [],
      },
    };
  }
}
