import { Box, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCaptcha } from "../../../redux/reducers/authSlice";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";

export default function Captcha() {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.auth.tempCaptchaText);
  const [data, setData] = useState({
    str: [
      "یک",
      "دو",
      "سه",
      "چهار",
      "پنج",
      "شش",
      "هفت",
      "هشت",
      "نه",
      "ده",
      "یازده",
      "دوازده",
      "سیزده",
      "چهارده",
      "پانزده",
      "شانزده",
      "هفده",
      "هجده",
      "نوزده",
      "بیست",
    ],
    num: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    isSet: false,
  });

  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setData({ ...data, isSet: false });
    setReset(!reset);
    console.log(reset);
  };

  useEffect(() => {
    if (!data.isSet) {
      const itemOne = data.str[Math.floor(Math.random() * data.str.length)];
      const itemTwo = data.str[Math.floor(Math.random() * data.str.length)];
      const numOne = data.num[data.str.indexOf(itemOne)];
      const numTwo = data.num[data.str.indexOf(itemTwo)];
      const sum = numOne + numTwo;
      const question = `${itemOne}  + ${itemTwo} = `;
      setData({ ...data, isSet: true });
      dispatch(setCaptcha({ text: question, sum: sum }));
    }
  }, [data, setData, reset]);
  console.log(data);
  return (
    <Box justifyContent={"space-evenly"} display={"flex"}>
      <Tooltip title="تغییر سوال">
        <IconButton
          onClick={handleReset}
          color="info"
          aria-label="add to shopping cart"
        >
          <ReplayIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ pt: 0.5 }}>
        <Typography variant="caption">جواب سوال زیر چیست ؟</Typography>
        <Typography textAlign={"right"} variant="subtitle2" color="secondary">
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
