import React from "react";
import UserPage from "../../../components/admin/users/UserPage";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

function User({ userData, userOrders }) {
  console.log(userOrders);
  return (
    <>
      <UserPage userData={userData} userOrders={userOrders} />
    </>
  );
}

export default User;

export async function getServerSideProps({ req, res, params }) {
  const info = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res, params }),
      },
    }
  );

  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-orders/${params.id}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const userData = await info.json();
  const userOrders = await orders.json();

  console.log(userOrders);

  return {
    props: {
      userData: userData[0],
      userOrders,
    },
  };
}
