import Head from "next/head";

import AllBlogs from "../../components/public/blog";

export default function BlogSection({ blogPosts = [] }) {
  return (
    <>
      {" "}
      <Head>
        <title>ایباکس - بلاگ</title>
      </Head>
      <AllBlogs blogPosts={blogPosts} />
    </>
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
