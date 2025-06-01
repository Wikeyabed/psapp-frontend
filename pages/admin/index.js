"use client";

import AdminDashboard from "../../components/admin/dashboard/";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";

function Admin({ users, orders, products }) {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isAdminLoggedIn]);

  if (loading) {
    return <div className="p-10 text-center">در حال بارگذاری...</div>;
  }

  return (
    <>
      {isAdminLoggedIn ? (
        <AdminDashboard users={users} orders={orders} products={products} />
      ) : (
        <div className="p-10 text-center">شما ادمین نیستید</div>
      )}
    </>
  );
}

export default Admin;

export async function getServerSideProps({ req, res }) {
  const token = getCookie("x-auth-token", { req, res });

  const [usersData, productsData, ordersData] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      headers: { token },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
      headers: { token },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
      headers: { token },
    }),
  ]);

  const [users, products, orders] = await Promise.all([
    usersData.json(),
    productsData.json(),
    ordersData.json(),
  ]);

  return {
    props: {
      users,
      orders,
      products,
    },
  };
}
