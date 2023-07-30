import FailedPayment from "../../../components/public/payments/FailedPayment";
import { useRouter } from "next/router";

export default function Fail() {
  const router = useRouter();
  const tid = router.query.tid;
  return <FailedPayment tid={tid} />;
}
