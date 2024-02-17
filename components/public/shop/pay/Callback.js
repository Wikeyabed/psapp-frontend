import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import SuccessfulPayment from "../../payments/SuccessPayment";
import FailedPayment from "../../payments/FailedPayment";
function Callback() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({
    track_id: "",
    order_id: "",
    status: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSaveCallbackToDB = async () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      track_id: data.track_id,
      order_id: data.order_id,
      status: data.status,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, requestOptions)
      .then((response) => {
        if (response.status == 201 || response.status == 200) {
          const cb = response.json();

          cb.then((res) => {
            if (res[0].status == "10") {
              handleVerifyAndStatus((res[0].transaction_id, res[0].order_id));
              setSuccess(true);
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
    setData({
      track_id: searchParams.get("trackId"),
      order_id: searchParams.get("orderId"),
      status: searchParams.get("status"),
    });
  }, [searchParams, router]);

  setTimeout(() => {
    handleSaveCallbackToDB();
  }, 500);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <div>
      {loading ? (
        "در حال پردازش ..."
      ) : success ? (
        <SuccessfulPayment tid={data.track_id} />
      ) : (
        <FailedPayment tid={data.track_id} />
      )}
    </div>
  );
}

export default Callback;
