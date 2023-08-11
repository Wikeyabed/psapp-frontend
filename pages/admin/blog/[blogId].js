import BlogSingle from "../../../components/admin/blog/BlogSingle";

function EditBlog({ blog }) {
  return <BlogSingle blog={blog} />;
}

export default EditBlog;

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${context.params.blogId}`
  );

  const blog = await res.json();

  console.log(blog);

  return {
    props: {
      blog: blog,
    },
  };
}
