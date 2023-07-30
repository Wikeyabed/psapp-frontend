import { Box, Typography, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCaptcha } from "../../../redux/reducers/authSlice";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";

export default function Captcha() {
  const dispatch = useDispatch();
  const previewRef = useRef(null);

  const text = useSelector((state) => state.auth.tempCaptchaText);
  const [data, setData] = useState({
    isSet: false,
  });

  function makeId(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    // abcdefghijklmnopqrstuvwxyz;
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    dispatch(setCaptcha({ text: result }));
    return result;
  }

  function createCanvas() {
    var r = (255 * Math.random()) | 0,
      g = (255 * Math.random()) | 0,
      b = (255 * Math.random()) | 0;
    const cssColor = "rgb(" + r + "," + g + "," + b + ")";
    const canvas = document.getElementById("captcha");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height / 1.3);
    ctx.font = "75px cv";
    ctx.fillStyle = cssColor;
    ctx.textAlign = "center";

    ctx.fillText(makeId(4), canvas.width / 2, canvas.height / 1.5);
  }

  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setData({ ...data, isSet: false });
    setReset(!reset);
  };

  useEffect(() => {
    if (!data.isSet) {
      createCanvas();
      setData({ ...data, isSet: true });
    }
  }, [data, setData, reset]);
  console.log(data);
  return (
    <Box justifyContent={"flex-start"} display={"flex"}>
      <Tooltip title="تغییر متن">
        <IconButton
          onClick={handleReset}
          // onClick={generateImage}
          color="info"
          aria-label="add to shopping cart"
        >
          <ReplayIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ pt: 0.5 }}>
        <Typography
          ref={previewRef}
          textAlign={"right"}
          variant="subtitle2"
          color="secondary"
        >
          {/* {text} */}
        </Typography>
      </Box>
      <Box
        id="captcha"
        sx={{
          width: 120,
          mt: 2,
          fontFamily: "cv !important",
        }}
        component="canvas"
      ></Box>
    </Box>
  );
}
