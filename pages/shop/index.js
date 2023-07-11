import Shop from "../../components/public/shop";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/reducers/authSlice";

export default function Home() {
  return <Shop />;
}
