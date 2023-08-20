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
    id: "",
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
      id: data.id,
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
              setSuccess(true);
            }
          });
        }
      })
      .catch((error) => console.log("error", error.message));
  };

  useEffect(() => {
    setData({
      id: searchParams.get("id"),
      track_id: searchParams.get("track_id"),
      order_id: searchParams.get("order_id"),
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
