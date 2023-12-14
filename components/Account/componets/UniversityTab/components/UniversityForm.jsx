/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { database } from "@/firebaseconfig";

import InputField from "../../InputComponent";
const UniversityForm = ({
  loading,
  editingUniversityId,
  setEditingUniversityId,
  setUniversities,
  setLoading,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleAddDepartment = () => {
    setDepartments([...departments, { name: "", schools: [] }]);
  };

  const handleRemoveDepartment = (index) => {
    const updatedDepartments = [...departments];
    updatedDepartments.splice(index, 1);
    setDepartments(updatedDepartments);
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index].name = value;
    setDepartments(updatedDepartments);
  };

  const handleAddSchool = (departmentIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].schools.push({ name: "", courses: [] });
    setDepartments(updatedDepartments);
  };

  const handleRemoveSchool = (departmentIndex, schoolIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].schools.splice(schoolIndex, 1);
    setDepartments(updatedDepartments);
  };

  const handleSchoolChange = (departmentIndex, schoolIndex, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].schools[schoolIndex].name = value;
    setDepartments(updatedDepartments);
  };

  const handleAddCourse = (departmentIndex, schoolIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].schools[schoolIndex].courses.push({
      name: "",
      feeStructureLink: "",
    });
    setDepartments(updatedDepartments);
  };

  const handleRemoveCourse = (departmentIndex, schoolIndex, courseIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].schools[schoolIndex].courses.splice(
      courseIndex,
      1
    );
    setDepartments(updatedDepartments);
  };

  const handleCourseChange = (
    departmentIndex,
    schoolIndex,
    courseIndex,
    field,
    value
  ) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].schools[schoolIndex].courses[
      courseIndex
    ][field] = value;
    setDepartments(updatedDepartments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const universitiesRef = database.ref("universities");
      const newUniversity = {
        name: name,
        description: description,
        image: imageLink,
        departments,
      };
      setLoading(true);
      if (editingUniversityId) {
        await set(ref(database, `blogs/${editingUniversityId}`), newUniversity);
        setEditingUniversityId(null);
        setLoading(false);
      } else {
        await push(universitiesRef, newUniversity);
        setLoading(false);
      }
      setName("");
      setDescription("");
      setImageLink("");
      setDepartments([]);
    } catch (error) {
      console.error("Error submitting university:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="justify-center">
      {/* Input fields for university information */}

      <InputField
        label={"University Name"}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        label={"University Location"}
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <InputField
        label={"Image Link"}
        type="text"
        value={imageLink}
        onChange={(e) => setImageLink(e.target.value)}
      />
      <InputField
        label={"Description"}
        type={"textarea"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Input fields for departments */}
      <div>
        <h4 className="text-xl font-semibold mb-4">Departments:</h4>
        {departments.map((department, departmentIndex) => (
          <div key={departmentIndex}>
            <InputField
              label={"Department"}
              type="text"
              value={department.name}
              onChange={(e) =>
                handleDepartmentChange(departmentIndex, e.target.value)
              }
            />

            {/* Input fields for schools */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Schools:</h5>
              {department.schools.map((school, schoolIndex) => (
                <div key={schoolIndex}>
                  <InputField
                    label={"School"}
                    type="text"
                    value={school.name}
                    onChange={(e) =>
                      handleSchoolChange(
                        departmentIndex,
                        schoolIndex,
                        e.target.value
                      )
                    }
                  />

                  {/* Input fields for courses */}
                  <div>
                    <h6 className="text-md font-semibold mb-2">Courses:</h6>
                    {school.courses.map((course, courseIndex) => (
                      <div key={courseIndex}>
                        <InputField
                          label={"Course Name"}
                          type="text"
                          value={course.name}
                          onChange={(e) =>
                            handleCourseChange(
                              departmentIndex,
                              schoolIndex,
                              courseIndex,
                              "name",
                              e.target.value
                            )
                          }
                        />
                        <InputField
                          label={"Fee Structure Link"}
                          type="text"
                          value={course.feeStructureLink}
                          onChange={(e) =>
                            handleCourseChange(
                              departmentIndex,
                              schoolIndex,
                              courseIndex,
                              "feeStructureLink",
                              e.target.value
                            )
                          }
                        />

                        <button
                          type="button"
                          className="relative text-sm transition duration-300 text-red-500 bg-black rounded-md px-3 py-1 mt-2"
                          onClick={() =>
                            handleRemoveCourse(
                              departmentIndex,
                              schoolIndex,
                              courseIndex
                            )
                          }
                        >
                          Remove Course
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="relative text-sm transition duration-300 text-green-400 bg-black rounded-md px-3 py-1 mt-2"
                      onClick={() =>
                        handleAddCourse(departmentIndex, schoolIndex)
                      }
                    >
                      Add Course
                    </button>
                  </div>

                  <button
                    type="button"
                    className="relative text-sm transition duration-300 text-red-500 bg-black rounded-md px-3 py-1 mt-3"
                    onClick={() =>
                      handleRemoveSchool(departmentIndex, schoolIndex)
                    }
                  >
                    Remove School
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="relative text-sm transition duration-300 text-green-400 bg-black rounded-md px-3 py-1 mt-3"
                onClick={() => handleAddSchool(departmentIndex)}
              >
                Add School
              </button>
            </div>

            <button
              type="button"
              className="relative text-sm transition duration-300 text-red-500 bg-black rounded-md px-3 py-1 mt-3"
              onClick={() => handleRemoveDepartment(departmentIndex)}
            >
              Remove Department
            </button>
          </div>
        ))}
        <button
          type="button"
          className="relative text-sm transition duration-300 text-green-400 bg-black rounded-md px-3 py-1 mt-3"
          onClick={handleAddDepartment}
        >
          Add Department
        </button>
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
          {editingUniversityId == null
            ? "Upload University"
            : " Update  University"}
        </button>
      )}
    </form>
  );
};

export default UniversityForm;
