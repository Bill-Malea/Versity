/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebase.config";
import InputField from "./InputComponent";
import { ref, onValue, set, push } from "firebase/database";
import DataItem from "./DataItem";
import QuillEditor from "./QuilEditor";
import Datepiker from "./Datepicker";
const ScholarshipTab = () => {
  const [scholarships, setScholarships] = useState([]);
  const [error, setError] = useState("");
  const [editingScholarshipId, setEditingFellowshipId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchScholarshipId, setSearchScholarshipId] = useState("");

  const [form, setForm] = useState({
    title: "",
    image: "",
    content: "",
    scholarshipUrl: "",
    deadline: null,
  });
  useEffect(() => {
    // Fetch existing scholarships from Firebase Realtime Database
    const fetchScholarships = () => {
      const scholarshipsRef = ref(database, "scholarships/");
      const unsubscribe = onValue(scholarshipsRef, (snapshot) => {
        const data = snapshot.val();
        if (!!data) {
          console.log(data);
          const scholarships = Object.entries(data).map(
            ([id, scholarship]) => ({
              id,
              ...scholarship,
            })
          );

          setScholarships(scholarships);
        } else {
          console.log("Data not found");
        }
      });

      return () => {
        unsubscribe();
      };
    };

    fetchScholarships();
  }, []);

  const handleEditClick = (scholarship) => {
    setEditingFellowshipId(scholarship.id);
    setForm({
      title: scholarship.title,
      image: scholarship.image,
      content: scholarship.content,
      scholarshipUrl: scholarship.scholarshipUrl,
      deadline: new Date(scholarship.deadline),
    });
  };

  const handleDeleteClick = async (id) => {
    // Delete scholarship from Firebase Realtime Database based on the id
    setLoading(true);
    try {
      set(ref(database, "scholarships/" + id), null).then(() => {
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
    const { title, image, content, scholarshipUrl, deadline } = form;
    console.log(
      title,
      "======TITLE===",
      image,
      "======IMAGE========",
      content,
      "=======CONTENT=====",
      scholarshipUrl,
      "=======SCHOLARSHIP====",
      deadline,
      "============DEADLINE"
    );
    if (!title || !image || !content || !scholarshipUrl) {
      setError("Please fill in all fields.");
      return;
    }
    const dbref = ref(database, "scholarships/");

    try {
      const data = {
        title,
        image,
        content,
        scholarshipUrl,
        deadline: deadline.toISOString(),
      };
      setLoading(true);
      if (editingScholarshipId) {
        // If editing  update the existing document
        await set(ref(database, `scholarships/${editingScholarshipId}`), data);

        setEditingFellowshipId(null);
      } else {
        // If adding a new scholarship, push a new document
        await push(dbref, data);
      }
      setForm({
        title: "",
        image: "",
        content: "",
        scholarshipUrl: "",
        deadline: null,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error submitting scholarship:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleContentChange = (content) => {
    setForm((prevForm) => ({ ...prevForm, content }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prevForm) => ({ ...prevForm, deadline: date }));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        <h3 className="text-2xl font-semibold mb-5 ">Scholarship Tab</h3>
        <InputField
          label={"Search Scholarship"}
          type="text"
          value={searchScholarshipId}
          onChange={(e) => setSearchScholarshipId(e.target.value)}
        />
        <h3 className="text-xl font-semibold mb-5 mt-5">
          Add Scholarship Programme
        </h3>
        {error && <div className="text-red-500 mb-4 mt-7">{error}</div>}
        {/* Scholarship Form */}
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
            label={"Scholarship Url"}
            type="text"
            name="scholarshipUrl"
            value={form.scholarshipUrl}
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
                onClick={null}
              />
            </div>
          ) : (
            <button
              className={`relative  text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black   rounded-md px-5 py-2 mt-5`}
              type="submit"
            >
              {editingScholarshipId == null
                ? "Upload Scholarship"
                : " Update  Scholarship"}
            </button>
          )}
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-5"> Scholarships</h3>
        {/* List of Existing Scholarships */}
        <ul>
          {scholarships
            .filter((scholarship) =>
              scholarship.id
                .toLowerCase()
                .includes(searchScholarshipId.toLowerCase())
            )
            .map((scholarship) => (
              <DataItem
                key={scholarship.id}
                title={scholarship.title}
                image={scholarship.image}
                content={scholarship.content}
                data={scholarship}
                onDeleteClick={() => handleDeleteClick(scholarship.id)}
                onEditClick={() => handleEditClick(scholarship)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ScholarshipTab;
