import Shop from "../../components/public/shop";
import { useDispatch } from "react-redux";
import { getProducts, setAllVariant } from "../../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";

export default function Home({ products, allVariants }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(products));
    dispatch(setAllVariant(allVariants));
    console.log("all variants", allVariants);
  });

  return (
    <>
      <Head>
        <title>ایباکس - ملزومات بسته بندی </title>
      </Head>
      <Shop />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  const varRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-variant`);

  const products = await res.json();
  const allVariants = await varRes.json();

  return {
    props: {
      products,
      allVariants,
    },
  };
}
