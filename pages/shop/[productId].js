import ProductPage from "../../components/public/shop/productPage";
import PublicLayout from "../../components/public/layout";
import { useRouter } from "next/router";

export default function ProductSingle() {
  const router = useRouter();

  return (
    <PublicLayout>
      product: {router.query.productId}
      <ProductPage />
    </PublicLayout>
  );
}
