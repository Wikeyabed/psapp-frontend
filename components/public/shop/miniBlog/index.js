import { Grid, Typography, Skeleton, Box, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Swiper from "../../layout/swiper/DraggableSwipe";
import MiniBlogCard from "./MiniBlogCard";

const BlogSkeletonItem = ({ isMobile }) => (
  <Box sx={{ 
    width: isMobile ? 280 : 320,
    height: isMobile ? 380 : 420,
    p: 2,
    position: 'relative'
  }}>
    <Skeleton 
      variant="rectangular" 
      width="100%" 
      height={isMobile ? 160 : 200}
      sx={{ borderRadius: 2, mb: 2 }} 
      animation="wave"
    />
    <Skeleton width="90%" height={28} sx={{ borderRadius: 1, mb: 1.5 }} />
    <Skeleton width="100%" height={16} sx={{ borderRadius: 1, mb: 1 }} />
    <Skeleton width="80%" height={16} sx={{ borderRadius: 1, mb: 1 }} />
    <Skeleton width="60%" height={16} sx={{ borderRadius: 1, mb: 2 }} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Skeleton width="40%" height={14} sx={{ borderRadius: 1 }} />
      <Skeleton width="30%" height={36} sx={{ borderRadius: '18px', ml: 0 }} />
    </Box>
  </Box>
);

const Title = () => (
  <Typography
    sx={{
      width: "100%",
      fontWeight: "bold",
      textDecoration: "underline",
      textDecorationColor: "primary.main",
      textDecorationThickness: "3px",
      textUnderlineOffset: "10px",
      textAlign: "center",
      mb: 4,
      fontSize: { xs: '1.25rem', md: '1.5rem' }
    }}
    component="div"
  >
    آخرین مطالب وبلاگ
  </Typography>
);

const EmptyState = () => (
  <Typography sx={{ 
    textAlign: "center", 
    width: "100%", 
    py: 4,
    color: "text.secondary"
  }}>
    موردی برای نمایش وجود ندارد
  </Typography>
);

function LatestBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const skeletonCount = useMemo(() => isMobile ? 1 : 3, [isMobile]);

  const getBlogPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
      const data = await response.json();
      setBlogs(data.filter(post => !post.is_video));
    } catch (error) {
      console.error("خطا در دریافت مطالب:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => getBlogPosts(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid container sx={{ py: 4 }}>
      <Grid item xs={12}>
        <Title />
      </Grid>
      
      {loading ? (
        <Grid container spacing={2} sx={{ px: 2, display: 'flex', justifyContent: 'center' }}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Grid item key={`skeleton-${index}`}>
              <BlogSkeletonItem isMobile={isMobile} />
            </Grid>
          ))}
        </Grid>
      ) : blogs.length > 0 ? (
        <Swiper items={blogs}>
          <MiniBlogCard video={false} />
        </Swiper>
      ) : (
        <EmptyState />
      )}
    </Grid>
  );
}

export default LatestBlog;