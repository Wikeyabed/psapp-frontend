import React from "react";
import { useRouter } from "next/router";
import BlankScreen from "../../HOC/BlankScreen";
function RegisterForm() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <BlankScreen>{id}</BlankScreen>
    </>
  );
}

export default RegisterForm;
