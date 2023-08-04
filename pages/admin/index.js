import AdminDashboard from "../../components/admin/dashboard/";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function Admin() {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );

  useEffect(() => {
    console.log("hello from out");
  }, [isAdminLoggedIn]);

  return <>{isAdminLoggedIn ? <AdminDashboard /> : ""}</>;
}

export default Admin;
