import AdminDashboard from "../../components/admin/dashboard/";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
function Admin({ users }) {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );

  useEffect(() => {
    console.log("hello from out");
  }, [isAdminLoggedIn]);

  return <>{isAdminLoggedIn ? <AdminDashboard users={users} /> : ""}</>;
}

export default Admin;

export async function getServerSideProps({ req, res }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
    headers: {
      token: getCookie("x-auth-token", { req, res }),
    },
  });

  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}
