import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Link from "../../../src/Link";
import ToPersianDate from "../../../src/TimestampToPersian";
import { useState, useEffect } from "react";
import parse from "html-react-parser";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [blogs]);

  const fetchBlogs = () => {
    let myHeaders = new Headers();

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setBlogs(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <Grid container spacing={2}>
      <Grid
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        lg={4}
        item
      >
        {" "}
        <Typography variant="h6" color={"ActiveCaption"}>
          موضوع
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        lg={4}
        item
      >
        <Typography variant="h6" color={"ActiveCaption"}>
          توضیحات
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        lg={4}
        item
      >
        <Typography variant="h6" color={"ActiveCaption"}>
          تاریخ ایجاد
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: { xs: "none", md: "block" },
        }}
        item
        xs={12}
      >
        {" "}
        <Divider
          sx={{
            backgroundColor: "#444",
            height: 3,
          }}
        />
      </Grid>

      {blogs.map((blog) => {
        return (
          <Box
            sx={{
              borderBottom: "1px solid #e2e2e2",
              backgroundColor: `${(blog.id * 1) % 2 == 0 ? "#e2e2e2" : "#fff"}`,
              p: 1,
            }}
            container
            component={Grid}
            item
            xs={12}
            key={blog.id}
          >
            <Grid xs={12} md={6} lg={4} item>
              {" "}
              <Link
                sx={{
                  textDecoration: "none",
                }}
                href={`/admin/blog/${blog.id}`}
              >
                <Typography>{blog.title}</Typography>
              </Link>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <Box
                sx={{
                  fontSize: 14,
                }}
                variant="body2"
                color={"GrayText"}
              >
                {parse(blog.description.slice(0, 10) + " ... ")}
              </Box>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              {" "}
              <ToPersianDate timestamp={blog.create_time} />
            </Grid>
          </Box>
        );
      })}
    </Grid>
  );
}

export default BlogList;
