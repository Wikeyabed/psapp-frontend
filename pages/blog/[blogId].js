import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import PublicLayout from "../../components/public/layout";
import Dog from "../../public/images/dog.jpg";
import BlogNav from "./breadcrumb";
export default function BlogSingle({ blog }) {
  return (
    <PublicLayout>
      <Grid display={"flex"} justifyContent={"center"} container>
        <Grid xs={12} md={10} lg={6}>
          {" "}
          <BlogNav blogId={15} blogTitle={"سلام این تایل است"} />
          <Card sx={{ mx: "auto", my: 4 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="280"
                image={Dog.src}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h4">
                  {blog.title}
                </Typography>

                <Typography gutterBottom variant="h5" component="h5">
                  {blog.create_time}
                </Typography>

                <Typography gutterBottom variant="h4" component="h4">
                  نویسنده : ادمین
                </Typography>
                <Typography
                  textAlign={"justify"}
                  variant="body1"
                  color="text.secondary"
                >
                  {blog.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${context.params.id}`
  );
  const blog = await res.json();

  return {
    props: {
      blog,
    },
  };
}
