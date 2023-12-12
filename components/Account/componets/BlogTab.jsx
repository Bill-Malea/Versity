/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebaseconfig";
import InputField from "./InputComponent";
import { ref, onValue, set, push } from "firebase/database";
import DataItem from "./DataItem";
const BlogTab = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [error, setError] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBlogs = () => {
      const blogsRef = ref(database, "blogs/");
      const unsubscribe = onValue(blogsRef, (snapshot) => {
        const data = snapshot.val();
        if (!!data) {
          const blogsData = Object.entries(data).map(([id, blog]) => ({
            id,
            ...blog,
          }));
          setBlogs(blogsData);
        } else {
        }
      });

      return () => {
        unsubscribe();
      };
    };

    fetchBlogs();
  }, []);

  const handleEditClick = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title || "");
    setImage(blog.image || "");
    setContent(blog.content || "");
    setBlogUrl(blog.blogUrl || "");
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      await set(ref(database, "blogs/" + id), null);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image || !content || !blogUrl) {
      setError("Please fill in all fields.");
      return;
    }

    const blogsRef = ref(database, "blogs/");
    try {
      const data = {
        title,
        image,
        content,
        blogUrl,
      };
      setLoading(true);
      if (editingBlogId) {
        // If editing an existing fellowship, update the existing document
        await set(ref(database, `blogs/${editingBlogId}`), data);

        setEditingBlogId(null);
      } else {
        // If adding a new fellowship, push a new document
        await push(blogsRef, data);
      }

      setTitle("");
      setImage("");
      setContent("");
      setBlogUrl("");
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        <h3 className="text-xl font-semibold mb-5">Blog Tab</h3>
        {error && <div className="text-red-500 mb-4 mt-7">{error}</div>}
        {/* Blog Form */}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            label="Image Link"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <InputField
            label="Content"
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <InputField
            label="Blog URL"
            type="text"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
          />

          {loading ? (
            <div>
              <img
                src="assets/images/loading.svg"
                alt="Loading Icon"
                className="animate-spin-slow h-7 w-7 mt-5"
                onClick={null}
              />
            </div>
          ) : (
            <button
              className={`relative  text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black   rounded-md px-5 py-2 mt-5`}
              type="submit"
            >
              {editingBlogId == null ? "Upload Blog" : " Update   Blog"}
            </button>
          )}
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-5"> Existing Blogs</h3>
        {/* List of Existing Blogs */}
        <ul>
          {blogs.map((blog) => (
            <DataItem
              key={blog.id}
              title={blog.title}
              image={blog.image}
              content={blog.content}
              data={blog}
              onDeleteClick={() => handleDeleteClick(blog.id)}
              onEditClick={() => handleEditClick(blog)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogTab;
