import PhoneVerification from "./PhoneVerification";
import RegisterForm from "./RegisterForm";
import { useSelector } from "react-redux";

function RegisterSteps() {
  const isVerified = useSelector((state) => state.auth.isSmsVerified);
  return <>{!isVerified ? <RegisterForm /> : <PhoneVerification />}</>;
}

export default RegisterSteps;
