import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function Pay() {
  const handleNewTransaction = async () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/new`, requestOptions)
      .then((response) => response.text())
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
