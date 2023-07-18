import ProductPage from "../../components/public/shop/productPage";
import PublicLayout from "../../components/public/layout";

export default function ProductSingle({ product }) {
  return (
    <PublicLayout>
      <ProductPage product={product} />
    </PublicLayout>
  );
}

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.API_URL}/products/${context.params.productId}`
  );
  const product = await res.json();

  console.log(product);

  return { props: { product: product[0] } };
};
