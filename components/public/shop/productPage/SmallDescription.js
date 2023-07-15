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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function SmallDescription({ desc }) {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="body1" component="div">
            مشخصات کل
          </Typography>
          <Demo>
            <List>
              {desc.map((item, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemIcon
                      sx={{
                        minWidth: "30px",
                        color: "#ccc",
                      }}
                    >
                      <ListIcon />
                    </ListItemIcon>
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
