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

  // Perform localStorage action
  res.setHeader(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRmMGJmNWFhLTQ4YmYtNDE3OS05ZTIxLWM5NTNiYTEwM2VmYiIsInJvbGUiOiIxIiwiaWF0IjoxNjkwNzQ1MzU3LCJleHAiOjE2OTA3ODEzNTd9.zCo7luhd7NfcGwFLLZSgoynPxKNL25uyVAdjPui-oeY"
  );

  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}
