import { useDispatch } from "react-redux";
import {
  getProducts,
  setAllVariant,
} from "../../../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";
import Categories from "../../../components/public/shop/categories/index.js";
import { CleanHands } from "@mui/icons-material";
import { uniqBy } from "lodash";

export default function CategoriesPage({ products, allVariants, categories }) {
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

    // removes duplicate

    const uniqueProducts = uniqBy(productsWithVariants, "info.product_id");
    console.log("its here 2 ", productsWithVariants);

    dispatch(getProducts(uniqueProducts));
    dispatch(setAllVariant(allVariants));
  });

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products = await res.json();

  const varRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-variant`);
  const allVariants = await varRes.json();

  const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/`);
  const categories = await catRes.json();

  console.log("ressssss", varRes);
  return {
    props: {
      products,
      allVariants,
      categories,
    },
  };
}
