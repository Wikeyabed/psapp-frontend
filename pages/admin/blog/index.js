import AdminBlog from "../../../components/admin/blog";
import { getCookie } from "cookies-next";

function Blog({ blogs }) {
  return <AdminBlog blogs={blogs} />;
}

export default Blog;

export async function getServerSideProps({ req, res }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/`, {
    headers: {
      token: getCookie("x-auth-token", { req, res }),
    },
  });

  const blogs = await response.json();

  console.log(blogs);

  return {
    props: {
      blogs,
    },
  };
}
