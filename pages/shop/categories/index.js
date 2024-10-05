import { useDispatch } from "react-redux";
import {
  getProducts,
  setAllVariant,
} from "../../../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";
import Categories from "../../../components/public/shop/categories/index.js";

export default function CategoriesPage({ products, allVariants }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(products));
    dispatch(setAllVariant(allVariants));
  });

  return (
    <>
      <Head>
        <title>ایباکس - دسته بندی ها</title>
      </Head>
      <Categories />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products = await res.json();

  const varRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-variant`);
  const allVariants = await varRes.json();

  console.log("ressssss", varRes);
  return {
    props: {
      products,
      allVariants,
    },
  };
}
