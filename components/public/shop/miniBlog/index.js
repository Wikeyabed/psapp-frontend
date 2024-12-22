import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swiper from "../../layout/swiper/DraggableSwipe";
import MiniBlogCard from "./MiniBlogCard";
import Link from "../../../../src/Link";

function LatestBlog() {
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const getBlogPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
    const data = await response.json();

    setPosts(data);
    // setPosts(data.slice(data.length - 10, data.length - 1));
  };

  const handleDataFilter = () => {
    const vids = posts.filter((post) => {
      return post.is_video == true;
    });

    const blog = posts.filter((post) => {
      return post.is_video == false;
    });
    setVideos(vids);
    setBlogs(blog);
  };

  useEffect(() => {
    getBlogPosts();

    handleDataFilter();
  }, [posts]);

  return (
    <Grid
      sx={{
        py: 2,
      }}
      container
    >
      <Grid xs={12}>
        <Typography
          sx={{
            width: "100% !important",
            fontWeight: "bold",
            textDecoration: "underline #primary.main !important",
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
      <Swiper items={blogs}>
        <MiniBlogCard video={false} />
      </Swiper>

      {/* <Grid display={"flex"} justifyContent={"center"} xs={12}>
        <Button
          component={Link}
          href="/blog"
          sx={{
            px: 10,
            mb: 10,
            fontWeight: "bold",
            backgroundColor: "#F17105",
          }}
          // color="warning"
          size="large"
          variant="contained"
        >
          تمامی وبلاگ ها
        </Button>
      </Grid> */}

      {/* <Grid xs={12}>
        <Typography
          sx={{
            mt: 2,

            width: "100% !important",
            fontWeight: "bold",
            textDecoration: "underline #primary.main !important",
            textDecorationThickness: "4px",
            textUnderlineOffset: 12,
            textAlign: "center",
          }}
          variant="h5"
          component={"div"}
        >
          آخرین ویدیو های آموزشی
        </Typography>
      </Grid>
      <Swiper items={videos}>
        <MiniBlogCard video={true} />
      </Swiper>

      <Grid display={"flex"} justifyContent={"center"} xs={12}>
        <Button
          component={Link}
          href="/videos"
          sx={{
            px: 10,
            fontWeight: "bold",
          }}
          color="warning"
          size="large"
          variant="contained"
        >
          تمامی ویدیو ها{" "}
        </Button>
      </Grid> */}
    </Grid>
  );
}

export default LatestBlog;
