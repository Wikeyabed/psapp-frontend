"use client";

import AdminDashboard from "../../components/admin/dashboard/";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
function Admin({ users, orders, products }) {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );

  useEffect(() => {
    console.log("hello from out");
  }, [isAdminLoggedIn]);

  return (
    <>
      {isAdminLoggedIn ? (
        <AdminDashboard users={users} orders={orders} products={products} />
      ) : (
        ""
      )}
    </>
  );
}

export default Admin;

export async function getServerSideProps({ req, res }) {
  const usersData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
    headers: {
      token: getCookie("x-auth-token", { req, res }),
    },
  });

  const productsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const ordersData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
    headers: {
      token: getCookie("x-auth-token", { req, res }),
    },
  });

  const users = await usersData.json();
  const orders = await ordersData.json();
  const products = await productsData.json();

  return {
    props: {
      users,
      orders,
      products,
    },
  };
}
