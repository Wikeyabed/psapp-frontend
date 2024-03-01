import React from "react";
import RegisterSteps from "../../components/public/auth/RegisterSteps";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "../../components/HOC/LoadingBar";
import Head from "next/head";
function Register() {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>ثبت نام در ایباکس</title>
      </Head>{" "}
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
