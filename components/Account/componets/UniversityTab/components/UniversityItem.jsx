/* eslint-disable @next/next/no-img-element */
import React from "react";

const UniversityItem = ({
  universityId,
  name,
  location,
  imageLink,
  description,
  onEditClick,
  onDeleteClick,
}) => {
  const capitalizeWords = (str) => {
    return str.replace(/\b(\w)/g, (s) => s.toUpperCase());
  };

  return (
    <li className="border-b border-gray-300 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={imageLink}
            alt={`${name} Logo`}
            className="w-16 h-16 rounded-full object-contain "
          />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-gray-600">{location}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={onEditClick}
          >
            Edit
          </button>
          <button
            className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
    </li>
  );
};

export default UniversityItem;
