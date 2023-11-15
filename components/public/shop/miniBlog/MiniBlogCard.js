import React from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
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
      <Card
        sx={{
          p: 1,

          borderBottomLeftRadius: "0 !important",
          borderBottomRightRadius: "0 !important",
          borderRadius: "10px",
        }}
        elevation={2}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{
            height: "160px !important",
            objectFit: "cover",
          }}
          image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${item.images_url[0]}`}
        />
        <Typography
          sx={{
            minHeight: 70,
            mt: 4,
            fontSize: "14px",
            textAlign: "center",
          }}
          variant="h6"
        >
          {item.title}
          {/* {truncate(item.title, 35)} */}
        </Typography>
        {/* <Typography
          sx={{
            mt: 2,
            fontSize: "9px !important",
            textAlign: "right !important",
            direction: "ltr !important",
            minHeight: "20px !important",
          }}
          color="text.secondary"
        >
          {parse(
            truncate(
              item.description.slice(0, item.description.length - 1),
              300
            )
          )}
        </Typography> */}
      </Card>
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
