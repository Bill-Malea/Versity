import React from "react";
import BlogFeaturedPosts from "./components/FeaturedBlog";
import BlogRecentPosts from "./components/RecentBlogs";
const BlogPage = ({ blogs }) => {
  return (
    <div className="lg:mx-10">
      <BlogFeaturedPosts featuredPosts={blogs} />
      <BlogRecentPosts recentPosts={blogs} />
    </div>
  );
};

export default BlogPage;
