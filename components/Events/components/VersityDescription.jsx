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

      {/* FILTER */}
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Departments</h2>

        <div className="flex flex-col  lg:flex-row">
          <select
            className="mb-4 lg:mr-5 lg:w-1/3 border border-black rounded-lg py-2 px-4"
            value={selectedSchool}
            onChange={(e) => {
              setSelectedSchool(e.target.value);
              setSelectedDepartment("");
              setSelectedCourse(null);
            }}
          >
            <option value="">Select School</option>
            {versity.schools.map((school, i) => (
              <option key={i} value={school.name}>
                {school.name}
              </option>
            ))}
          </select>

          <select
            className="mb-4 lg:mr-5 lg:w-1/3 border border-black rounded-md py-2 px-4"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedCourse(null);
            }}
          >
            <option value="">Select Department</option>
            {versity.schools
              .find((school) => school.name === selectedSchool)
              ?.departments.map((department, i) => (
                <option key={i} value={department.name}>
                  {department.name}
                </option>
              ))}
          </select>

          <select
            className="mb-4 lg:mr-5 lg:w-1/3 border border-black rounded-md py-2 px-4"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {versity.schools
              .find((school) => school.name === selectedSchool)
              ?.departments.find((dept) => dept.name === selectedDepartment)
              ?.courses.map((course, i) => (
                <option key={i} value={course.name}>
                  {course.name}
                </option>
              ))}
          </select>

          {selectedCourse != null ? (
            <button
              className="bg-black text-green-500 px-2 py-2 rounded-md"
              onClick={handleDownload}
            >
              Download Fee Structure
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VersityDetails;
