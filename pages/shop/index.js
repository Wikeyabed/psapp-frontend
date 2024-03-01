import Shop from "../../components/public/shop";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";

export default function Home({ products }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(products));
  });

  return (
    <>
      <Head>
        <title>ایباکس - صفحه نخست </title>
      </Head>
      <Shop />
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
