import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function Pay() {
  const handleNewTransaction = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", "6a7f99eb-7c20-4412-a972-6dfb7cd253a4");
    myHeaders.append("X-SANDBOX", "0");

    var raw = JSON.stringify({
      order_id: 102,
      amount: 40000,
      name: "علی رضا محمدی",
      phone: "09198169771",
      mail: "my@site.com",
      desc: "توضیحات پرداخت کننده",
      callback: "https://eebox.ir/payment/success",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.idpay.ir/v1.1/payment", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <Button onClick={handleNewTransaction}>تراکنش جدید</Button>

      <Button>تایید تراکنش</Button>
    </div>
  );
}

export default Pay;
