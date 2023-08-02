import { getCookie } from "cookies-next";
import UsersList from "../../../components/admin/users";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Users({ users }) {
  // const router = useRouter();
  // const isAdminLoggedIn = useSelector((state) => state.auth.isAdminLoggedIn);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/404");
  //   }
  // }, []);

  return (
    <>
      <UsersList users={users} />
    </>
  );
}

export default Users;

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
