/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebase.config";
import InputField from "./InputComponent";
import { ref, onValue, push, set } from "firebase/database";
import DataItem from "./DataItem";
import QuillEditor from "./QuilEditor";
const BlogTab = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchBlogId, setSearchBlogId] = useState("");
  const [form, setForm] = useState({
    title: "",
    image: "",
    content: "",
    blogUrl: "",
  });

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

    setForm({
      title: blog.title,
      image: blog.image,
      content: blog.content,
      blogUrl: blog.blogUrl,
    });
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
    const { title, image, content, blogUrl } = form;

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
        // If editing an existing blog, update the existing document
        await set(ref(database, `blogs/${editingBlogId}`), data);

        setEditingBlogId(null);
      } else {
        // If adding a new blog, push a new document
        await push(blogsRef, data);
      }

      setForm({
        title: "",
        image: "",
        content: "",
        blogUrlUrl: "",
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleContentChange = (content) => {
    setForm((prevForm) => ({ ...prevForm, content }));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        <h3 className="text-xl font-semibold mb-5">Blog Tab</h3>
        <InputField
          label={"Search Blog"}
          type="text"
          value={searchBlogId}
          onChange={handleChange}
        />
        <h3 className="text-lg font-semibold mb-5">Add Blog</h3>
        {error && <div className="text-red-500 mb-4 mt-7">{error}</div>}
        {/* Blog Form */}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <InputField
            label="Image Link"
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />

          <QuillEditor value={form.content} onChange={handleContentChange} />

          <InputField
            label="Blog URL"
            type="text"
            name="blogUrl"
            value={form.blogUrl}
            onChange={handleChange}
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

        <ul>
          {blogs
            .filter((blog) =>
              blog.id.toLowerCase().includes(searchBlogId.toLowerCase())
            )
            .map((blog) => (
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
