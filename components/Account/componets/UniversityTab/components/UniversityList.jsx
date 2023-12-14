import React from "react";

const UniversityList = ({
  universities,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <ul>
      {universities.map((university) => (
        <li key={university.id}>
          {university.id} - {university.name} - {university.location}
          <button
            type="button"
            className="relative text-sm ml-3 text-green-400 bg-black rounded-md px-2 py-1 mt-2"
            onClick={() => handleEditClick(university)}
          >
            Edit
          </button>
          <button
            type="button"
            className="relative text-sm ml-3 text-red-500 bg-black rounded-md px-2 py-1 mt-2"
            onClick={() => handleDeleteClick(university.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UniversityList;
