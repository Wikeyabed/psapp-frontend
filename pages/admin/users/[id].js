import React from "react";
import UserPage from "../../../components/admin/users/UserPage";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

function User({ userData }) {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <UserPage userData={userData} />
    </>
  );
}

export default User;

export async function getServerSideProps({ req, res, params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const userData = await response.json();

  console.log(userData);

  return {
    props: {
      userData: userData[0],
    },
  };
}
