"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "../../../../src/Link";
import { useEffect, useState } from "react";
import Quantity from "./Quantity";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
function RecommendedSingle({ item, variants }) {
  const [activeQuantity, setActiveQuantity] = useState(false);
  const products = useSelector((state) => state.product.products);
  const handleActiveQuantity = () => {
    setActiveQuantity(true);
  };

  // const productVariants = allVariants.filter((variant) => {
  //   if (variant != undefined) {
  //     return item.info.product_id == variant.variant_product_id;
  //   }
  // });

  useEffect(() => {
    console.log("!!!!HELOOOO", item);
  }, [item]);

  {
    return (
      <Card
        sx={{
          width: 300,
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
            my: 1,
            textAlign: "center",
          }}
          component={"div"}
        >
          {" "}
          {item.product_name}
        </Typography>
        <Link href={`/products/${item.product_id}/`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${item.images_url[0]}`}
            width={0}
            height={0}
            loading="eager"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={item.product_name}
          />
        </Link>
        <CardActions>
          <Button
            sx={{
              borderRadius: "25px",
            }}
            href={`/products/${item.product_id}/`}
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
