import { BlogDescription } from "@/components";
import { getBlogs } from "../api/firebase";

export default function BlogDetails({ blog }) {
  return <BlogDescription blogPost={blog} />;
}

export async function getStaticPaths() {
  const blogs = await getBlogs();

  const paths = blogs.map((blog) => ({
    params: { id: blog.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const blogs = await getBlogs();

  const blog = blogs.find((blog) => blog.id.toString() === params.id);

  return {
    props: {
      blog,
    },
  };
}
