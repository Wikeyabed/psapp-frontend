import React from "react";
import { useRouter } from "next/router";
import { dec } from "../../../src/DecryptHash";
function RegisterForm() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>{id}</div>
    </>
  );
}

export default RegisterForm;
