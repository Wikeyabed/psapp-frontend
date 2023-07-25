import React from "react";
import LoginForm from "../../components/public/auth/LoginForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "../../components/HOC/LoadingBar";

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
      {" "}
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
