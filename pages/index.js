import Shop from "../components/public/shop";
import { useDispatch } from "react-redux";
import { getProducts, setAllVariant } from "../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";
import { uniqBy } from "lodash";

export default function Home({ products, allVariants }) {
  const dispatch = useDispatch();
  useEffect(() => {
    let productsWithVariants = [];

    products.map((product) => {
      let thisProductVariant = [];
      allVariants.filter((variant) => {
        if (variant.variant_product_id == product.product_id) {
          thisProductVariant = [...thisProductVariant, variant];

          productsWithVariants = [
            ...productsWithVariants,
            { info: product, variants: thisProductVariant },
          ];
        }
      });
    });

    const uniqueProducts = uniqBy(productsWithVariants, "info.product_id");
    console.log("its here 2 ", productsWithVariants);

    dispatch(getProducts(uniqueProducts));
    dispatch(setAllVariant(allVariants));
  });

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products = await res.json();

  const varRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-variant`);
  const allVariants = await varRes.json();

  return {
    props: {
      products,
      allVariants,
    },
  };
}
