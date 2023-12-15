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
    <div className="lg:ml-36 mr-10 mx-5 my-10">
      <div className="flex  lg:flex-row sm:flex-col  w-full">
        <img
          src={versity.image}
          alt={versity.name}
          className="lg:w-1/2 h-96 object-cover mb-4 rounded-md mr-10"
        />

        <div>
          <h2 className="text-3xl w-full font-semibold mb-4">{versity.name}</h2>

          <div className="mt-5">{versity.description}</div>
        </div>
      </div>

      {/* FILTER */}
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Departments</h2>

        {/* School Dropdown */}

        <div className="">
          <select
            className="mb-4  mr-5 border-4 border-gray-300  rounded-lg py-2 px-4"
            value={selectedSchool}
            onChange={(e) => {
              setSelectedSchool(e.target.value);
              setSelectedDepartment(""); // Reset department when school changes
              setSelectedCourse(null); // Reset course when school changes
            }}
          >
            <option value="">Select School</option>

            {versity.schools.map((school, i) => (
              <option key={i} value={school.name}>
                {school.name}
              </option>
            ))}
          </select>

          {/* Department Dropdown */}
          <select
            className="mb-4 mr-5 border border-gray-300 rounded-md py-2 px-4"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedCourse(null); // Reset course when department changes
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

          {/* Course Dropdown */}
          <select
            className="mb-4 mr-5 border border-gray-300 rounded-md py-2 px-4"
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

          {/* Download Button */}
          {selectedCourse != null ? (
            <button
              className="bg-black border-gray-300 text-green-500 px-2 py-2 rounded-md"
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
