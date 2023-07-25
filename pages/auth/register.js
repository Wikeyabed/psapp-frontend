import React from "react";
import RegisterSteps from "../../components/public/auth/RegisterSteps";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "../../components/HOC/LoadingBar";

function Register() {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/shop");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      {" "}
      {!isLoggedIn ? (
        <LoadingBar>
          <RegisterSteps />
        </LoadingBar>
      ) : (
        ""
      )}
    </>
  );
}

export default Register;
