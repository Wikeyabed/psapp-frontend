import React from "react";
import { Button, Paper, Grid, Typography } from "@mui/material";
import { truncate } from "../../../../src/tranculate";
import parse from "html-react-parser";
import Link from "../../../../src/Link";
function MiniBlogCard({ item }) {
  return (
    <Grid
      sx={{
        padding: 2,
        mt: 5,
      }}
      item
      xs={12}
    >
      <Paper
        sx={{
          p: 2,
          height: 250,
          borderBottomLeftRadius: "0 !important",
          borderBottomRightRadius: "0 !important",
          borderRadius: "10px",
        }}
        elevation={2}
      >
        <Typography variant="h6">{truncate(item.title, 35)}</Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: "9px !important",
            textAlign: "right !important",
            direction: "ltr !important",
          }}
          color="text.secondary"
        >
          {parse(
            truncate(
              item.description.slice(0, item.description.length - 1),
              300
            )
          )}
        </Typography>
      </Paper>
      <Button
        component={Link}
        href={`blog/${item.id}`}
        sx={{
          borderTopLeftRadius: "0 !important",
          borderTopRightRadius: "0 !important",
        }}
        color="primary"
        variant="contained"
        fullWidth
      >
        ادامه خواندن
      </Button>
    </Grid>
  );
}

export default MiniBlogCard;
