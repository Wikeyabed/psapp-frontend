import React from "react";
import AdminLayout from "../layout/index";
import UsersTable from "./UsersTable";

function UsersList({ users }) {
  return (
    <AdminLayout>
      <UsersTable users={users} />
    </AdminLayout>
  );
}

export default UsersList;
