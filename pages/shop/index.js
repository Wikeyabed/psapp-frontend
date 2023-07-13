import Shop from "../../components/public/shop";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/reducers/productSlice";
import { useEffect } from "react";

export default function Home({ products }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(products));
  });

  return <Shop />;
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/v1/products/");
  const products = await res.json();
  console.log("is fetching products");

  console.log(products);
  return {
    props: {
      products,
    },
  };
}
