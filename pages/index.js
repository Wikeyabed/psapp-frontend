import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts, setAllVariant } from "../redux/reducers/productSlice";
import Head from "next/head";

// Lazy load the Shop component
const Shop = dynamic(() => import("../components/public/shop"), {
  loading: () => <p></p>,
  ssr: false,
});

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

    dispatch(getProducts(productsWithVariants));
    dispatch(setAllVariant(allVariants));
  }, [products, allVariants, dispatch]);

  return (
    <>
      <Head>
        <title>
          ایباکس | مرجع خرید کارتن پستی، نایلون حبابدار، پاکت و سلفون
        </title>
        <meta
          name="description"
          content="خرید آنلاین کارتن پستی، نایلون حبابدار، پاکت پستی و سلفون با بهترین قیمت و ارسال سریع در ایباکس"
        />
      </Head>
      <Shop />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Fetch data with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const [productsRes, variantsRes] = await Promise.all([
      fetch(`${API_URL}/products`, { signal: controller.signal }),
      fetch(`${API_URL}/all-variant`, { signal: controller.signal }),
    ]);

    clearTimeout(timeout);

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
