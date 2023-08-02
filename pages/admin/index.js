import AdminDashboard from "../../components/admin/dashboard/";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function Admin() {
  const router = useRouter();
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );

  useEffect(() => {
    console.log("hello from out");
  }, [isAdminLoggedIn]);

  return <>{isAdminLoggedIn ? <AdminDashboard /> : ""}</>;
}

export default Admin;
