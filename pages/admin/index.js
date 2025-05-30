"use client";

import AdminDashboard from "../../components/admin/dashboard/";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { AdminSocketProvider } from "../../context/AdminSocketContext"; 

function Admin({ users, orders, products }) {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );

  useEffect(() => {
    console.log("hello from admin");
  }, [isAdminLoggedIn]);

  return (
    <>
      {isAdminLoggedIn ? (
        <AdminSocketProvider>
          <AdminDashboard users={users} orders={orders} products={products} />
        </AdminSocketProvider>
      ) : (
        ""
      )}
    </>
  );
}

export default Admin;

export async function getServerSideProps({ req, res }) {
  const token = getCookie("x-auth-token", { req, res });

  const [usersRes, ordersRes, productsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      headers: { token },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
      headers: { token },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
      headers: { token },
    }),
  ]);

  const [users, orders, products] = await Promise.all([
    usersRes.json(),
    ordersRes.json(),
    productsRes.json(),
  ]);

  return {
    props: {
      users,
      orders,
      products,
    },
  };
}
