/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const BlogPost = ({ post }) => (
    <Link href={`/blog/${post.id}`}>

  <div className="bg-white p-4 rounded-lg shadow-md  cursor-pointer">
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-40 object-cover mb-4 rounded-t-md"
    />
    <div>
      <h3 className="text-md font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-800">{post.description}</p>
    </div>
  </div>
 
  </Link>
);

export default BlogPost;
