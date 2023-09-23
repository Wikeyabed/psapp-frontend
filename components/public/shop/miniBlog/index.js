import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swiper from "../../layout/swiper/DraggableSwipe";
import MiniBlogCard from "./MiniBlogCard";
import Link from "../../../../src/Link";

function LatestBlog() {
  const [posts, setPosts] = useState([]);
  const getBlogPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
    const data = await response.json();

    setPosts(data.slice(data.length - 10, data.length - 1));
    console.log(posts);
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <Grid
      sx={{
        mt: 2,

        py: 2,
      }}
      container
    >
      <Grid xs={12}>
        <Typography
          sx={{
            mt: 5,
            mb: 2,
            width: "100% !important",
            fontWeight: "bold",
            textDecoration: "underline",
            textDecorationColor: "#007aff",
            textDecorationThickness: "4px",
            textUnderlineOffset: 12,
            textAlign: "center",
          }}
          variant="h5"
          component={"div"}
        >
          آخرین مطالب وبلاگ
        </Typography>
      </Grid>
      <Swiper items={posts}>
        <MiniBlogCard />
      </Swiper>
      <Grid
        sx={{
          mt: 4,
        }}
        display={"flex"}
        justifyContent={"center"}
        xs={12}
      >
        <Button
          component={Link}
          href="/blog"
          sx={{
            px: 10,
            fontWeight: "bold",
          }}
          color="warning"
          size="large"
          variant="outlined"
        >
          تمامی وبلاگ ها
        </Button>
      </Grid>
    </Grid>
  );
}

export default LatestBlog;
