import React from "react";
import LoginForm from "../../components/public/auth/LoginForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

function LoginPage() {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/shop");
    }
  }, [isLoggedIn, router]);

  return <> {!isLoggedIn ? <LoginForm /> : ""}</>;
}

export default LoginPage;
