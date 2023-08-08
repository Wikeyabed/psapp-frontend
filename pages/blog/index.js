import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import PublicLayout from "../../components/public/layout";
import Link from "../../src/Link";
import ToPersianDate from "../../src/TimestampToPersian";

export default function BlogSection({ blogPosts = [] }) {
  return (
    <PublicLayout>
      <Container>
        <Box sx={{ my: 5, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            وبلاگ
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            آخرین مطالب آموزشی ایباکس
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {blogPosts.length > 0
            ? blogPosts.map((post, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 200 }}
                      image={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/${post.images_url[0]}`}
                      alt={post.title}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent>
                        <Typography
                          component={Link}
                          href={`/blog/${post.id}`}
                          variant="h5"
                          sx={{
                            textDecoration: "none",
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {post.description.slice(0, 30) + "..."}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                        {/* <Avatar alt={post.author} src={post.avatarUrl} /> */}
                        <Box
                          sx={{ ml: 1 }}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Typography variant="subtitle2">
                            {post.author}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            <ToPersianDate timestamp={post.create_time} />
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))
            : "هیچ پستی وجود ندارد"}
        </Grid>
      </Container>
    </PublicLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const blogPosts = await res.json();

  return {
    props: {
      blogPosts,
    },
  };
}
