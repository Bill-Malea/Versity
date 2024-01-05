/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const VersityDetails = ({ versity }) => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleDownload = () => {
    console.log("Download Action:", {
      selectedSchool,
      selectedDepartment,
      selectedCourse,
    });
  };

  return (
    <div className="lg:ml-36 mx-5 my-10">
      <div className="flex flex-col w-full lg:flex-row">
        <img
          src={versity.image}
          alt={versity.name}
          className="w-full h-64 object-cover mb-4 rounded-md lg:w-1/2 lg:mr-10"
        />

        <div className="lg:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">{versity.name}</h2>
          <div className="mt-5 ">{versity.description}</div>
        </div>
      </div>
    </div>
  );
};

export default VersityDetails;
