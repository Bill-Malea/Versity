/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { database } from "@/firebase.config";
import { ref, onValue, push, set, update } from "firebase/database";
import InputField from "./InputComponent";
import UniversityItem from "./UniversityTab/components/UniversityItem";

const CollegeTab = () => {
  const [collages, setCollages] = useState([]);
  // University details
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [collageLink, setCollageLink] = useState("");
  const [description, setDescription] = useState("");
  const [uniId, setUniId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch collages from Firebase
    const fetchUniversities = () => {
      const universitiesRef = ref(database, "collages/");
      onValue(universitiesRef, (snapshot) => {
        const data = snapshot.val();
        setCollages(
          data
            ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
            : []
        );
      });
    };
    fetchUniversities();
  }, []);

  const createCollage = async (collageData) => {
    const universityRef = push(ref(database, "collages"));
    await set(universityRef, collageData);
    return universityRef.key;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !imageLink || !description || !collageLink) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const collagedata = {
        name: name,
        location: location,
        image: imageLink,
        description,
        collageLink: collageLink,
      };

      if (uniId) {
        const universityRef = ref(database, `collages/${uniId}`);

        await update(universityRef, collagedata);
      } else {
        await createCollage(collagedata);
      }

      setName("");
      setLocation("");
      setImageLink("");
      setDescription("");
      setUniId(null);
      setError("");
      setCollageLink("");
    } catch (error) {
      setError("Error submitting collage: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteClick = async (universityId) => {
    try {
      setLoading(true);

      await set(ref(database, "collages/" + universityId), null);

      setCollages(collages.filter((uni) => uni.id !== universityId));

      setName("");
      setLocation("");
      setImageLink("");
      setDescription("");
      setUniId(null);
      setError("");
      setCollageLink("");
    } catch (error) {
      setError("Error deleting collage: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onEditClick = (collage) => {
    setName(collage.name);
    setLocation(collage.location);
    setImageLink(collage.image);
    setDescription(collage.description);
    setCollageLink(collage.collageLink);
    setUniId(collage.id);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-10">
        {/* University Form */}
        <h3 className="text-xl font-semibold mb-5">Add Collage</h3>
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
            label="Collage Link"
            value={collageLink}
            onChange={(e) => setCollageLink(e.target.value)}
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
            {uniId == null ? "Add Collage" : "Update Collage"}
          </button>
        </form>
      </div>

      {/* List of Existing Universities */}
      <div className="mt-10 lg:mt-0">
        <h3 className="text-xl font-semibold mb-5">Existing Collages</h3>
        <ul>
          {collages.map((collage) => (
            <UniversityItem
              universityId={collage.id}
              imageLink={collage.image}
              key={collage.id}
              collage={collage}
              onDeleteClick={() => onDeleteClick(collage.id)}
              onEditClick={() => onEditClick(collage)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollegeTab;
