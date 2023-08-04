import React from "react";
import UserPage from "../../../components/admin/users/UserPage";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

function User({ userData, userInvoices }) {
  return (
    <>
      <UserPage userData={userData} userInvoices={userInvoices} />
    </>
  );
}

export default User;

export async function getServerSideProps({ req, res, params }) {
  const info = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const invoices = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/invoices/user/${params.id}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const userData = await info.json();
  const userInvoices = await invoices.json();

  console.log(userInvoices);

  return {
    props: {
      userData: userData[0],
      userInvoices,
    },
  };
}
