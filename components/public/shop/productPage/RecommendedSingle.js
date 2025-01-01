"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import Quantity from "./Quantity";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Link from "../../../../src/Link";
function RecommendedSingle({ item, variants }) {
  const [activeQuantity, setActiveQuantity] = useState(false);
  const products = useSelector((state) => state.product.products);

  {
    return (
      <Card
        sx={{
          position: "relative",
          mx: "auto",
          // border: "1px solid ",
          boxShadow: "0 0 5px 0.5px #593F62",
          borderBottom: "2px solid #593F62",
          borderRadius: 5,
        }}
      >
        <Typography
          sx={{
            mt: 1,
            textAlign: "center",
            height: 70,
          }}
          component={"div"}
        >
          {" "}
          {item.product_name}
        </Typography>
        <Box
          component={Link}
          href={`/products/${item.product_id}?category=${item.product_name}`}
          target="_blank"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${item.images_url[0]}`}
            width={0}
            height={0}
            loading="eager"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={item.product_name}
          />
        </Box>
        <CardActions>
          <Button
            target={"_blank"}
            sx={{
              borderRadius: "25px",
            }}
            href={`/products/${item.product_id}?category=${item.product_name}`}
            component={Link}
            variant="contained"
          >
            خرید
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default RecommendedSingle;
