import React, { useState, useEffect } from "react";
import { database } from "@/firebaseconfig";
import { ref, onValue, set, push } from "firebase/database";
import UniversityForm from "./components/UniversityForm";
import UniversityList from "./components/UniversityList";

const UniversityTab = () => {
  const [universities, setUniversities] = useState([]);
  const [editingUniversityId, setEditingUniversityId] = useState(null);
  const [loading, setLoading] = useState(false);

  const universitiesRef = ref(database, "universities/");

  useEffect(() => {
    const unsubscribe = onValue(universitiesRef, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        const universitiesArray = Object.entries(data).map(
          ([id, university]) => ({
            id,
            ...university,
          })
        );
        setUniversities(universitiesArray);
      } else {
        console.log("Data not found");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [universitiesRef]);

  const handleEditClick = (university) => {
    setEditingUniversityId(university.id);
  };

  const handleDeleteClick = async (id) => {
    try {
      await set(ref(database, "universities/" + id), null);
    } catch (error) {
      console.error("Error deleting university:", error);
    }
  };

  const handleEditCancel = () => {
    setEditingUniversityId(null);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">University Tab</h3>

      <div className="flex gap-8 sm:flex-col lg:flex:row w-full ">
        <UniversityForm
          loading={loading}
          editingUniversityId={editingUniversityId}
          setEditingUniversityId={setEditingUniversityId}
          setUniversities={setUniversities}
          setLoading={setLoading}
        />

        <UniversityList
          universities={universities}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};

export default UniversityTab;
