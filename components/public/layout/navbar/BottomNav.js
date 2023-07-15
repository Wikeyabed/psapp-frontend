import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
import { css } from "@emotion/react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactIcon from "@mui/icons-material/ContactEmergency";
const styles = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  font-size: 0.5rem;
`;
export default function BottomNav() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
      sx={styles}
    >
      <BottomNavigationAction label="فروشگاه" icon={<HomeIcon />} />
      <BottomNavigationAction label="فروشگاه" icon={<HomeIcon />} />
      <BottomNavigationAction label="فروشگاه" icon={<HomeIcon />} />
    </BottomNavigation>
  );
}
