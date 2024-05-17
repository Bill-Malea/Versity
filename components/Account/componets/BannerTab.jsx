/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebase.config";
import InputField from "./InputComponent";
import { ref, onValue, push, set } from "firebase/database";
import DataItem from "./DataItem";
const BannerTab = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState(null);
  useEffect(() => {
    const fetchBanners = () => {
      const bannerRef = ref(database, "banners/");
      const unsubscribe = onValue(bannerRef, (snapshot) => {
        const data = snapshot.val();
        if (!!data) {
          const bannersData = Object.entries(data).map(([id, banner]) => ({
            id,
            ...banner,
          }));
          setBanners(bannersData);
        } else {
        }
      });

      return () => {
        unsubscribe();
      };
    };

    fetchBanners();
  }, []);

  const handleEditClick = (banner) => {
    setEditingBannerId(banner.id);
    setTitle(banner.title || "");
    setImage(banner.image || "");
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      await set(ref(database, "banners/" + id), null);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      setError("Please fill in all fields.");
      return;
    }

    const bannerRef = ref(database, "banners/");
    try {
      const data = {
        title,
        image,
      };
      setLoading(true);
      if (editingBannerId) {
        // If editing an existing fellowship, update the existing document
        await set(ref(database, `banners/${editingBannerId}`), data);

        setEditingBannerId(null);
      } else {
        // If adding a new fellowship, push a new document
        await push(bannerRef, data);
      }

      setTitle("");
      setImage("");

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        <h3 className="text-xl font-semibold mb-5">Banners Tab</h3>
        {error && <div className="text-red-500 mb-4 mt-7">{error}</div>}
        {/* Banner  Form */}
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
              {editingBannerId == null ? "Upload Banner" : " Update   Banner"}
            </button>
          )}
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-5"> Existing Banners</h3>
        {/* List of Existing Blogs */}
        <ul>
          {banners.map((banner) => (
            <DataItem
              key={banner.id}
              title={banner.title}
              image={banner.image}
              content={banner.content}
              data={banner}
              onDeleteClick={() => handleDeleteClick(banner.id)}
              onEditClick={() => handleEditClick(banner)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BannerTab;
