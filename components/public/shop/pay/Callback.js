"use client";
import { getCookie } from "cookies-next";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import SuccessfulPayment from "../../payments/SuccessPayment";
import FailedPayment from "../../payments/FailedPayment";

function Callback() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({
    track_id: "",
    status: "",
    success: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const encoded = router.asPath;
  const decoded = decodeURIComponent(encoded).replace(/&amp;/g, "&");
  const params = new URLSearchParams(decoded.toString());

  // const url = router.asPath;
  // const params = new URLSearchParams(url);
  // // const path = usePathname();
  // const searchParams = useSearchParams();

  const handleSaveCallbackToDB = async () => {
    console.log("in callback", data);
    console.log("inside save to db", data);

    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      track_id: data.track_id,
      orderStatus: data.status,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, requestOptions)
      .then((response) => {
        console.log("status ");
        const promise = response.json();
        console.log("1212", promise);
        if (response.status == 201 || response.status == 200) {
          const cb = response.json();
          cb.then((res) => {
            if (res[0].status == "2" || res[0].status == "1") {
              setSuccess(true);
              handleVerifyAndStatus((res[0].transaction_id, res[0].order_id));
            } else {
              console.log("its not");
            }
          });
        }
      })
      .catch((error) => console.log("error", error.message));
  };

  const handleVerifyAndStatus = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", getCookie("x-auth-token"));

    var raw = JSON.stringify({
      id: data.id,
      order_id: data.order_id,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-payment/`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error)); 
  };

  useEffect(() => {
    setData(
      {
        success: searchParams.get("success"),
        track_id: params.get("trackId"),
        status: params.get("status"),
      },
      console.log(data)
    );
  }, [loading]);

  setTimeout(() => {
    handleSaveCallbackToDB();

    console.log("inside save to db", data);
  }, 500);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <Suspense>
      <div>
        {loading ? (
          "در حال پردازش ..."
        ) : data.success == "1" ? (
          <SuccessfulPayment tid={data.track_id} />
        ) : (
          <FailedPayment tid={data.track_id} />
        )}
      </div>
    </Suspense>
  );
}

export default Callback;
