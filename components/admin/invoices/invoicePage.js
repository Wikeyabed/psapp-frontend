import { useRouter } from "next/router";
import AdminLayout from "../layout/index";

function InvoicePage() {
  const router = useRouter();
  const { id } = router.query;

  console.log("hello", router.query);

  return <AdminLayout>invoiceId : {id}</AdminLayout>;
}

export default InvoicePage;
