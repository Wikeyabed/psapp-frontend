import { Button } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

function Pay() {
  return (
    <div>
      <Button onClick={handleNewTransaction}>تراکنش جدید</Button>

      <Button>تایید تراکنش</Button>
    </div>
  );
}

export default Pay;
