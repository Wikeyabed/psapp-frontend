import React from "react";
import User from "../../components/public/user";
import Head from "next/head";

function UserPage() {
  return (
    <>
      <Head>
        <title>ایباکس - پروفایل کاربر</title>
      </Head>
      <User />
    </>
  );
}

export default UserPage;
