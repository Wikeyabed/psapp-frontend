import { useDispatch } from "react-redux";
import { getProducts } from "../../../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";
import Categories from "../../../components/public/shop/categories/index.js";

export default function CategoriesPage({ products }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(products));
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

  return {
    props: {
      products,
    },
  };
}
