import Shop from "../../components/public/shop";
import { useDispatch } from "react-redux";
import { getProducts, setAllVariant } from "../../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";

export default function Home({ products, allVariants }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // First, group all variants by their product_id
    const variantsByProductId = allVariants.reduce((acc, variant) => {
      const productId = variant.variant_product_id;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(variant);
      return acc;
    }, {});

    // Then create the final products array with all variants included
    const productsWithVariants = products.map((product) => ({
      info: product,
      variants: variantsByProductId[product.product_id] || [], // All matching variants
    }));

    console.log("Products with variants:", productsWithVariants);
    dispatch(getProducts(productsWithVariants));
    dispatch(setAllVariant(allVariants));
  }, [products, allVariants, dispatch]);

  return (
    <>
      <Head>
        <title>ایباکس - ملزومات بسته بندی</title>
      </Head>
      <Shop />
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch both endpoints in parallel
    const [productsRes, variantsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-variant`),
    ]);

    if (!productsRes.ok || !variantsRes.ok) {
      throw new Error("Failed to fetch data");
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
