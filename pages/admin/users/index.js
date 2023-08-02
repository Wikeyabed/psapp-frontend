import { getCookie } from "cookies-next";
import UsersList from "../../../components/admin/users";

function Users({ users }) {
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
  // const headers = await req.getHeaders();
  // await res.setHeader("token", getCookie("x-auth-token", { req, res }));

  // console.log(req.headers);
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}
