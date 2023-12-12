import React from "react";
import BlogPost from "./BlogPost";

const BlogFeaturedPosts = ({ featuredPosts }) => (
  <div className="mb-20">
    <h2 className="text-xl font-semibold mb-4">Featured Blog</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {featuredPosts.map((post, index) => (
        <BlogPost key={index} post={post} />
      ))}
    </div>
  </div>
);

export default BlogFeaturedPosts;
