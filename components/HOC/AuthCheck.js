/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/reducers/authSlice";
import { startProgress, endProgress } from "../../redux/reducers/loadingSlice";

function AuthCheck({ children }) {
  const dispatch = useDispatch();
  const [checkToken, setCheckToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null && token != undefined && !checkToken) {
      dispatch(startProgress());
      setCheckToken(true);
      console.log("check token", checkToken);
      var myHeaders = new Headers();
      myHeaders.append("token", token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`${process.env.API_URL}/token`, requestOptions)
        .then((response, error) => {
          if (response.status == 200) {
            return response.json();
          }
        })
        .then((result) => {
          const data = result[0];
          console.log(data);
          dispatch(
            userLogin({
              firstName: data.first_name,
              lastName: data.last_name,
              phoneNumber: data.phone_number,
              address: data.address,
              email: data.email,
              refer: data.refer,
              invoiceIds: data.invoices_id,
              shoppingCartIds: data.shopping_list_id,
            })
          );
        })
        .catch((error) => console.log("error", error));
      dispatch(endProgress());
    }
  }, []);
  return <>{children}</>;
}

export default AuthCheck;
