import React from "react";
import LoginForm from "../../components/public/auth/LoginForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "../../components/HOC/LoadingBar";
import Head from "next/head";

function LoginPage() {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/shop");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>ورود به ایباکس</title>
      </Head>{" "}
      {!isLoggedIn ? (
        <LoadingBar>
          <LoginForm />
        </LoadingBar>
      ) : (
        ""
      )}
    </>
  );
}

export default LoginPage;
