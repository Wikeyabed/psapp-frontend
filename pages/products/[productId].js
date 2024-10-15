import ProductPage from "../../components/public/shop/productPage";
import PublicLayout from "../../components/public/layout";
import Head from "next/head";

export default function ProductSingle({ product, variants }) {
  return (
    <PublicLayout>
      <Head>
        {/* Torob Headers start */}
        <meta name="product_id" content={product.product_id} />
        <meta name="product_name" content={product.product_name} />
        <meta
          name="product_price"
          content={product.price * (1 - product.discount * 0.01)}
        />
        <meta name="product_old_price" content={product.price} />
        <meta
          name="availability"
          content={product.product_quantity > 0 ? "instock" : "outofstock"}
        />
        <meta property="og:image" content={product.images_url[0]} />

        {/* Torob Headers end */}

        <title>ایباکس - {product.product_name}</title>
      </Head>
      <ProductPage variants={variants} product={product} />
    </PublicLayout>
  );
}

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${context.params.productId}`
  );

  const varRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products-variant/${context.params.productId}`
  );

  const product = await res.json();

  const variants = await varRes.json();

  return { props: { product: product[0], variants } };
};
