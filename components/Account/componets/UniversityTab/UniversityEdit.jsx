/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebase.config";
import { ref, onValue, push, set, update } from "firebase/database";
import InputField from "../InputComponent";
import UniversityItem from "./components/UniversityItem";

const UniversityTab = () => {
  const [universities, setUniversities] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [universityLink, setUniversityLink] = useState("");
  const [description, setDescription] = useState("");
  const [uniId, setUniId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchUniId, setSearchUniId] = useState("");
  const [showUniversities, setShowUniversities] = useState(true);
  useEffect(() => {
    // Fetch universities from Firebase
    const fetchUniversities = () => {
      const universitiesRef = ref(database, "universities/");
      onValue(universitiesRef, (snapshot) => {
        const data = snapshot.val();
        setUniversities(
          data
            ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
            : []
        );
      });
    };
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (searchUniId) {
      const university = universities.find((uni) => uni.id === searchUniId);
      if (university) {
        onEditClick(university);
      }
    }
  }, [searchUniId, universities]);

  const createUniversity = async (universityData) => {
    const universityRef = push(ref(database, "universities"));
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
        uniLink: universityLink,
      };

      /// update uni
      if (uniId) {
        const universityRef = ref(database, `universities/${uniId}`);

        await update(universityRef, universitydata);
      } else {
        // create a uni
        await createUniversity(universitydata);
      }

      setName("");
      setLocation("");
      setImageLink("");
      setDescription("");
      setUniversityLink("");
      setUniId(null);
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
      await set(ref(database, "universities/" + universityId), null);
      setName("");
      setLocation("");
      setImageLink("");
      setDescription("");
      setUniversityLink("");
      setUniId(null);
      setError("");
      // Update the local state to reflect the deletion
      setUniversities(universities.filter((uni) => uni.id !== universityId));
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
    setUniversityLink(university.uniLink);

    setUniId(university.id);
  };
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        <InputField
          label={"Search University"}
          type="text"
          value={searchUniId}
          onChange={(e) => setSearchUniId(e.target.value)}
        />
        <h3 className="text-xl font-semibold mb-5">
          Add University and Program
        </h3>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* University Fields */}
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
            label="University Link"
            value={universityLink}
            onChange={(e) => setUniversityLink(e.target.value)}
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
            {uniId == null ? "Add University" : "Update University"}
          </button>
        </form>
      </div>
      <div className="flex flex-col">
        <button
          className="text-sm transition h-12  duration-300 text-green-400 bg-black rounded-md px-5 py-2 mb-5"
          onClick={() => setShowUniversities((prev) => !prev)}
        >
          {showUniversities ? "Hide" : "Show"} Existing Universities
        </button>
        {showUniversities && (
          <>
            <h3 className="text-xl font-semibold mb-5">
              Existing Universities
            </h3>
            <ul>
              {universities.map((university) => (
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

export default UniversityTab;
