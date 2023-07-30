import SuccessfulPayment from "../../../components/public/payments/SuccessPayment";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  const tid = router.query.tid;
  return <SuccessfulPayment tid={tid} />;
}
