import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import PublicLayout from "../../components/public/layout";
import Link from "../../src/Link";

const blogPosts = [
  {
    title: "نام پست",
    description: "توضیحات پست 1",
    author: "ادمین",
    imageUrl: "https://via.placeholder.com/150",
    avatarUrl: "https://via.placeholder.com/150",
    date: "1/1/2017",
  },
  {
    title: "نام پست",
    description: "توضیحات پست 1",
    author: "ادمین",
    imageUrl: "https://via.placeholder.com/150",
    avatarUrl: "https://via.placeholder.com/150",
    date: "1/1/2017",
  },
];

export default function BlogSection() {
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
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={post.imageUrl}
                  alt={post.title}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      component={Link}
                      href={`/blog/${20}`}
                      variant="h5"
                    >
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {post.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                    {/* <Avatar alt={post.author} src={post.avatarUrl} /> */}
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="subtitle2">{post.author}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {post.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PublicLayout>
  );
}
