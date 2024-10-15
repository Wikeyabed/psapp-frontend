import Head from "next/head";
import BlogSinglePage from "../../components/public/blog/BlogSinglePage";

export default function BlogSingle({ blog }) {
  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <BlogSinglePage blog={blog} />
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${context.params.blogId}`
  );
  const blog = await res.json();

  return {
    props: {
      blog,
    },
  };
}
