import Shop from "../components/public/shop";
import { useDispatch } from "react-redux";
import { getProducts, setAllVariant } from "../redux/reducers/productSlice";
import { useEffect } from "react";
import Head from "next/head";
import UserChatWidget from "../components/chat/UserChatWidget.js"; // 👈 ایمپورت ویجت چت

export default function Home({ products, allVariants }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // دسته‌بندی واریانت‌ها بر اساس آیدی محصول
    const variantsByProductId = allVariants.reduce((acc, variant) => {
      const productId = variant.variant_product_id;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(variant);
      return acc;
    }, {});

    // ترکیب محصولات با واریانت‌ها
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
          ایباکس | مرجع خرید کارتن پستی، نایلون حبابدار، پاکت و سلفون با ارسال
          سریع
        </title>
      </Head>
      <Shop />
      <UserChatWidget /> {/* 👈 ویجت چت در صفحه اصلی */}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [productsRes, variantsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-variant`),
    ]);

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
