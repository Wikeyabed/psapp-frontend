import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListIcon from "@mui/icons-material/List";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "../../../../src/Link";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function SmallDescription({ desc }) {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <Typography variant="body2" color={"secondary"} textAlign={"justify"}>
            مجموعه ایباکس همواره میکوشد اجناس خود را با بهترین کیفیت و پایین
            ترین قیمت به فروش برساند.از این رو هزینه ارسال محصولات بر عهده مشتری
            می باشد.
          </Typography>

          <Typography
            color={"primary"}
            sx={{ mt: 1, mb: 2, fontWeight: "bold" }}
            variant="body1"
            component="div"
          >
            جهت اطلاع از هزینه ارسال از طریق صفحه{" "}
            <Box
              sx={{
                mx: 1,
                fontWeight: "bold",
                color: "#444",
                textDecoration: "none",
                pb: "1px !important",
                borderBottom: "3px solid lightgrey",
                transition: ".4s ease all",
                "&:hover": {
                  color: "#000",
                  borderColor: "red",
                },
              }}
              component={Link}
              href="/contact"
            >
              تماس با ما
            </Box>
            در ارتباط باشید.
          </Typography> */}

          <Typography
            sx={{ mt: 4, mb: 2, fontWeight: "bold" }}
            variant="h6"
            component="div"
          >
            مشخصات کلی
          </Typography>
          <Demo>
            <List>
              {desc.map((item, i) => {
                return (
                  <ListItem key={i}>
                    <FiberManualRecordIcon
                      sx={{
                        minWidth: "30px",
                        color: "#666",
                        fontSize: 10,
                      }}
                    >
                      <ListIcon />
                    </FiberManualRecordIcon>
                    <ListItemText>
                      <Typography variant="body2">{item}</Typography>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
