import React from "react";
import AdminLayout from "../layout/index";
import UsersTable from "./UsersTable";

function UsersList() {
  return (
    <AdminLayout>
      <UsersTable />
    </AdminLayout>
  );
}

export default UsersList;
