/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebaseconfig";
import InputField from "./InputComponent";
import { ref, onValue, push, set } from "firebase/database";
import DataItem from "./DataItem";
const FellowshipTab = () => {
  const [fellowships, setFellowships] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [fellowshipUrl, setFellowshipUrl] = useState("");
  const [error, setError] = useState("");
  const [editingFellowshipId, setEditingFellowshipId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch existing fellowships from Firebase Realtime Database
    const fetchFellowships = () => {
      const fellowshipsRef = ref(database, "fellowships/");
      const unsubscribe = onValue(fellowshipsRef, (snapshot) => {
        const data = snapshot.val();
        if (!!data) {
          const fellowships = Object.entries(data).map(([id, university]) => ({
            id,
            ...university,
          }));
          setFellowships(fellowships);
        } else {
          console.log("Data not found");
        }
      });

      return () => {
        unsubscribe();
      };
    };

    fetchFellowships();
  }, []);

  const handleEditClick = (fellowship) => {
    setEditingFellowshipId(fellowship.id);
    setTitle(fellowship.title);
    setImage(fellowship.image);
    setContent(fellowship.content);
    setFellowshipUrl(fellowship.fellowshipUrl);
  };

  const handleDeleteClick = async (id) => {
    // Delete fellowship from Firebase Realtime Database based on the id
    setLoading(true);
    try {
      set(ref(database, "fellowships/" + id), null).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.error("Error deleting scholarship:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image || !content || !fellowshipUrl) {
      setError("Please fill in all fields.");
      return;
    }

    // Add or update fellowship details in Firebase Realtime Database
    try {
      const fellowshipsRef = ref(database, "fellowships/");

      const data = {
        title,
        image,
        content,
        fellowshipUrl,
      };

      setLoading(true);
      if (editingFellowshipId) {
        // If editing an existing fellowship, update the existing document
        await set(ref(database, `fellowships/${editingFellowshipId}`), data);
        setEditingFellowshipId(null);
      } else {
        // If adding a new fellowship, push a new document
        await push(fellowshipsRef, data);
      }

      // Reset input fields after submission
      setTitle("");
      setImage("");
      setContent("");
      setFellowshipUrl("");
      setError("");
      setLoading(false);
    } catch (error) {
      console.error("Error submitting fellowship:", error);
      setError("Error submitting fellowship. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        <h3 className="text-xl font-semibold mb-5">
          {" "}
          Add Fellowship Programme
        </h3>

        {error && <div className="text-red-500 mb-4 mt-7">{error}</div>}
        {/* Fellowship Form */}
        <form onSubmit={handleSubmit}>
          <InputField
            label={"Title"}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            label={"ImageLink"}
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <InputField
            label={"Content"}
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <InputField
            label={"Fellowship Url"}
            type="text"
            value={fellowshipUrl}
            onChange={(e) => setFellowshipUrl(e.target.value)}
          />

          {loading ? (
            <div>
              <img
                src="assets/images/loading.svg"
                alt="Logout Icon"
                className="animate-spin-slow h-7 w-7 mt-5"
                onClick={null}
              />
            </div>
          ) : (
            <button
              className={`relative  text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black   rounded-md px-5 py-2 mt-5`}
              type="submit"
            >
              {editingFellowshipId == null
                ? "Upload Fellowship"
                : " Update Fellowship"}
            </button>
          )}
        </form>
      </div>
      {/* List of Existing Fellowships */}
      <div>
        <h3 className="text-xl font-semibold mb-5">Fellowship Programmes</h3>
        <ul>
          {fellowships.map((fellowship) => (
            <DataItem
              key={fellowship.id}
              title={fellowship.title}
              image={fellowship.image}
              content={fellowship.content}
              data={fellowship}
              onDeleteClick={() => handleDeleteClick(fellowship.id)}
              onEditClick={() => handleEditClick(fellowship)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FellowshipTab;
