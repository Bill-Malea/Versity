/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebase";
import InputField from "./InputComponent";
import { ref, onValue, set, push } from "firebase/database";
import DataItem from "./DataItem";
const NewsTab = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [newsUrl, setNewsUrl] = useState("");
  const [error, setError] = useState("");
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchNews = () => {
      const newsRef = ref(database, "news/");
      const unsubscribe = onValue(newsRef, (snapshot) => {
        const data = snapshot.val();
        if (!!data) {
          const newsData = Object.entries(data).map(([id, newsItem]) => ({
            id,
            ...newsItem,
          }));
          setNews(newsData);
        } else {
          console.log("Data not found");
        }
      });

      return () => {
        unsubscribe();
      };
    };

    fetchNews();
  }, []);

  const handleEditClick = (newsItem) => {
    setTitle(newsItem.title || "");
    setImage(newsItem.image || "");
    setContent(newsItem.content || "");
    setNewsUrl(newsItem.newsUrl || "");
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      set(ref(database, "news/" + id), null).then(() => {
        // Success
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image || !content || !newsUrl) {
      setError("Please fill in all fields.");
      return;
    }

    const newsRef = ref(database, "news/");
    try {
      const data = {
        title,
        image,
        content,
        newsUrl,
      };

      setLoading(true);
      if (editingNewsId) {
        // If editing an existing fellowship, update the existing document
        await set(ref(database, `news/${editingScholarshipId}`), data);

        setEditingNewsId(null);
      } else {
        // If adding a new fellowship, push a new document
        await push(newsRef, data);
      }

      setTitle("");
      setImage("");
      setContent("");
      setNewsUrl("");
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        <h3 className="text-xl font-semibold mb-5">News Tab</h3>
        {error && <div className="text-red-500 mb-4 mt-7">{error}</div>}
        {/* News Form */}
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
            label="News URL"
            type="text"
            value={newsUrl}
            onChange={(e) => setNewsUrl(e.target.value)}
          />

          {loading ? (
            <div>
              <img
                src="assets/images/loading.svg"
                alt="Loading Icon"
                className="animate-spin-slow h-7 w-7 mt-5"
              />
            </div>
          ) : (
            <button
              className={`relative  text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black   rounded-md px-5 py-2 mt-5`}
              type="submit"
            >
              {editingNewsId == null ? "Upload News" : " Update  News"}
            </button>
          )}
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-5"> News</h3>
        {/* List of Existing News */}
        <ul>
          {news.map((newsItem) => (
            <DataItem
              key={newsItem.id}
              title={newsItem.title}
              image={newsItem.image}
              content={newsItem.content}
              data={newsItem}
              onDeleteClick={() => handleDeleteClick(newsItem.id)}
              onEditClick={() => handleEditClick(newsItem)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsTab;
