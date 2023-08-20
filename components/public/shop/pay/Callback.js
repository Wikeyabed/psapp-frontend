import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Callback() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const track_id = searchParams.get("track_id");
  const order_id = searchParams.get("order_id");
  const status = searchParams.get("status");

  const handleSaveCallbackToDB = () => {
    var myHeaders = new Headers();
    myHeaders.append("token", getCookie("x-auth-token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
      track_id: track_id,
      order_id: order_id,
      status: status,
    });

    console.log(raw);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    handleSaveCallbackToDB();
  }, []);

  return <div></div>;
}

export default Callback;
