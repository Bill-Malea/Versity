import React from 'react';
import BlogPost from './BlogPost';

const BlogRecentPosts = ({ recentPosts }) => (
  <div>
    <h2 className="text-xl font-semibold my-4">Recent Blogs</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {recentPosts.map((post, index) => (
        <BlogPost key={index} post={post} />
      ))}
    </div>
  </div>
);

export default BlogRecentPosts;
