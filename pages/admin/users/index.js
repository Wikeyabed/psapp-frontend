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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`);

  res.setHeader("token", getCookie("x-auth-token", { req, res }));
  res.setHeader("Set-Cookie", "foo=bar");

  console.log(getCookie("x-auth-token", { req, res }));

  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}
