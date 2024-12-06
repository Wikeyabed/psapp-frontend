import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Select,
  MenuItem,
  Typography,
  Divider,
  Grid,
  Box,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import ToPersianDate from "../../../src/TimestampToPersian";
import { persianNumber } from "../../../src/PersianDigits";
import moment from "moment-jalaali";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";

function OrderStatus({ order }) {
  const [status, setStatus] = useState(order.status);

  console.log("status", order);
  const [bg, setBg] = useState("#fff");

  const handleBgColor = (status) => {
    status == "200" || status == "2"
      ? setBg("#70c758")
      : status == "1" || status == "100"
      ? setBg("#67d0f0")
      : status == "3"
      ? setBg("orange")
      : setBg("#d15a52");
  };

  useEffect(() => {
    handleBgColor(order.status);
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    handleBgColor(e.target.value);

    console.log(e.target.value);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", getCookie("x-auth-token"));

    var raw = JSON.stringify({
      status: e.target.value,
      phoneNumber: order.customer_phone,
      order_number: order.order_number,
      order_id: order.order_id,
      userName: order.customer_name,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${order.order_id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <Stack direction="row" spacing={1}>
      <Select
        size="small"
        sx={{
          backgroundColor: bg,
          borderRadius: "20px",
          fontSize: "14px",
        }}
        value={status == null ? "-2" : status}
        onChange={handleStatusChange}
      >
        <MenuItem value={order.status}>وضعیت فعلی</MenuItem>
        <MenuItem value={"100"}>در حال پردازش</MenuItem>
        <MenuItem value={"200"}>تکمیل شده</MenuItem>
        <MenuItem value={"-2"}>کنسل شده</MenuItem>
      </Select>
    </Stack>
  );
}

export default OrderStatus;
