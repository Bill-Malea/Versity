/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebase.config";
import InputField from "./InputComponent";
import { ref, onValue, push, set } from "firebase/database";
import DataItem from "./DataItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import QuillEditor from "./QuilEditor";
import Datepiker from "./Datepicker";
const FellowshipTab = () => {
  const [fellowships, setFellowships] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: "",
    content: "",
    fellowshipUrl: "",
    deadline: null,
  });
  const [error, setError] = useState("");
  const [editingFellowshipId, setEditingFellowshipId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchFellowshipId, setSearchFellowshipId] = useState("");

  useEffect(() => {
    // Fetch existing fellowships from Firebase Realtime Database
    const fetchFellowships = () => {
      const fellowshipsRef = ref(database, "fellowships/");
      const unsubscribe = onValue(fellowshipsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fellowships = Object.entries(data).map(([id, fellowship]) => ({
            id,
            ...fellowship,
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
    setForm({
      title: fellowship.title,
      image: fellowship.image,
      content: fellowship.content,
      fellowshipUrl: fellowship.fellowshipUrl,
      deadline: new Date(fellowship.deadline),
    });
  };

  const handleDeleteClick = async (id) => {
    // Delete fellowship from Firebase Realtime Database based on the id
    setLoading(true);
    try {
      await set(ref(database, "fellowships/" + id), null);
      toast.success("Fellowship deleted successfully");
    } catch (error) {
      console.error("Error deleting fellowship:", error);
      toast.error("Error deleting fellowship. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, image, content, fellowshipUrl, deadline } = form;
    if (!title || !image || !content || !fellowshipUrl || !deadline) {
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
        deadline: deadline.toISOString(),
      };

      setLoading(true);
      if (editingFellowshipId) {
        // If editing an existing fellowship, update the existing document
        await set(ref(database, `fellowships/${editingFellowshipId}`), data);
        setEditingFellowshipId(null);
        toast.success("Fellowship updated successfully");
      } else {
        // If adding a new fellowship, push a new document
        await push(fellowshipsRef, data);
        toast.success("Fellowship added successfully");
      }

      // Reset input fields after submission
      setForm({
        title: "",
        image: "",
        content: "",
        fellowshipUrl: "",
        deadline: null,
      });
      setError("");
    } catch (error) {
      console.error("Error submitting fellowship:", error);
      setError("Error submitting fellowship. Please try again.");
      toast.error("Error submitting fellowship. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setForm((prevForm) => ({ ...prevForm, deadline: date }));
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
        <h3 className="text-2xl font-semibold mb-5">Fellowship Tab</h3>
        <InputField
          label={"Search Fellowship"}
          type="text"
          value={searchFellowshipId}
          onChange={(e) => setSearchFellowshipId(e.target.value)}
        />
        <h3 className="text-xl font-semibold mb-5 mt-5">
          Add Fellowship Programme
        </h3>

        {error && <div className="text-red-500 mb-4 mt-7">{error}</div>}
        {/* Fellowship Form */}
        <form onSubmit={handleSubmit}>
          <InputField
            label={"Title"}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <InputField
            label={"ImageLink"}
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
          <div className="mb-12">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <QuillEditor value={form.content} onChange={handleContentChange} />
          </div>
          <InputField
            label={"Fellowship Url"}
            type="text"
            name="fellowshipUrl"
            value={form.fellowshipUrl}
            onChange={handleChange}
          />

          <div className="mb-4">
            <Datepiker
              handleDateChange={handleDateChange}
              selecteddate={form.deadline}
            />
          </div>
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
              className={`relative text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black rounded-md px-5 py-2 mt-5`}
              type="submit"
            >
              {editingFellowshipId == null
                ? "Upload Fellowship"
                : "Update Fellowship"}
            </button>
          )}
        </form>
      </div>
      {/* List of Existing Fellowships */}
      <div>
        <h3 className="text-xl font-semibold mb-5">Fellowship Programmes</h3>
        <ul>
          {fellowships
            .filter((fellowship) =>
              fellowship.id
                .toLowerCase()
                .includes(searchFellowshipId.toLowerCase())
            )
            .map((fellowship) => (
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
      <ToastContainer />
    </div>
  );
};

export default FellowshipTab;
