/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebase.config";
import { ref, onValue, push, set, update } from "firebase/database";
import InputField from "./InputComponent";
import UniversityItem from "./UniversityTab/components/UniversityItem";

const CollegesTab = () => {
  const [colleges, setColleges] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [collegeLink, setCollegeLink] = useState("");
  const [description, setDescription] = useState("");
  const [colId, setColId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchColId, setSerachColId] = useState("");
  const [showCollages, setShowCollages] = useState(true);
  useEffect(() => {
    // Fetch colleges from Firebase
    const fetchCollages = () => {
      const collegesRef = ref(database, "colleges/");
      onValue(collegesRef, (snapshot) => {
        const data = snapshot.val();
        setColleges(
          data
            ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
            : []
        );
      });
    };
    fetchCollages();
  }, []);

  useEffect(() => {
    if (searchColId) {
      const university = colleges.find((uni) => uni.id === searchColId);
      if (university) {
        onEditClick(university);
      }
    }
  }, [searchColId, colleges]);

  const createUniversity = async (universityData) => {
    const universityRef = push(ref(database, "colleges"));
    await set(universityRef, universityData);
    return universityRef.key;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !imageLink || !description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const universitydata = {
        name: name,
        location: location,
        image: imageLink,
        description: description,
        uniLink: collegeLink,
      };

      /// update uni
      if (colId) {
        const universityRef = ref(database, `colleges/${colId}`);

        await update(universityRef, universitydata);
      } else {
        // create a uni
        await createUniversity(universitydata);
      }

      setName("");
      setLocation("");
      setImageLink("");
      setDescription("");
      setCollegeLink("");
      setColId(null);
      setError("");
    } catch (error) {
      setError("Error submitting university: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteClick = async (universityId) => {
    try {
      setLoading(true);

      // Delete the university
      await set(ref(database, "colleges/" + universityId), null);
      setName("");
      setLocation("");
      setImageLink("");
      setDescription("");
      setCollegeLink("");
      setColId(null);
      setError("");
      // Update the local state to reflect the deletion
      setColleges(colleges.filter((uni) => uni.id !== universityId));
    } catch (error) {
      setError("Error deleting university: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onEditClick = (university) => {
    setName(university.name);
    setLocation(university.location);
    setImageLink(university.image);
    setDescription(university.description);
    setCollegeLink(university.uniLink);

    setColId(university.id);
  };
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        <InputField
          label={"Search College"}
          type="text"
          value={searchColId}
          onChange={(e) => setSerachColId(e.target.value)}
        />
        <h3 className="text-xl font-semibold mb-5">Add College and Program</h3>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <InputField
            label="Image Link"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />

          <InputField
            label="College Link"
            value={collegeLink}
            onChange={(e) => setCollegeLink(e.target.value)}
          />
          <InputField
            type={"textarea"}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className={`text-sm transition duration-300 text-green-400 bg-black rounded-md px-5 py-2 mt-5`}
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {colId == null ? "Add University" : "Update University"}
          </button>
        </form>
      </div>
      <div className="flex flex-col">
        <button
          className="text-sm transition h-12  duration-300 text-green-400 bg-black rounded-md px-5 py-2 mb-5"
          onClick={() => setShowCollages((prev) => !prev)}
        >
          {showCollages ? "Hide" : "Show"} Existing Colleges
        </button>
        {showCollages && (
          <>
            <h3 className="text-xl font-semibold mb-5">Existing Colleges</h3>
            <ul>
              {colleges.map((university) => (
                <UniversityItem
                  universityId={university.id}
                  imageLink={university.image}
                  key={university.id}
                  university={university}
                  onDeleteClick={() => onDeleteClick(university.id)}
                  onEditClick={() => onEditClick(university)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CollegesTab;
