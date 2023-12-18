/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { database } from "@/firebaseconfig";
import { ref, push, set } from "firebase/database";
import InputField from "../../InputComponent";

const UniversityForm = ({
  schools,
  setSchools,
  name,
  setName,
  location,
  setLocation,
  imageLink,
  setImageLink,
  description,
  setDescription,
  loading,
  editingUniversityId,
  setEditingUniversityId,
  setLoading,
}) => {
  const [error, setError] = useState("");

  const handleAddschools = () => {
    setSchools([...schools, { name: "", departments: [] }]);
  };

  const handleRemoveSchool = (index) => {
    const updatedSchools = [...schools];
    updatedSchools.splice(index, 1);
    setSchools(updatedSchools);
  };

  const handleSchoolsChange = (index, value) => {
    const updatedSchools = [...schools];
    updatedSchools[index].name = value;
    setSchools(updatedSchools);
  };

  const handleAddDepartment = (schoolIndex) => {
    const updatedSchools = [...schools];
    updatedSchools[schoolIndex].departments.push({ name: "", courses: [] });
    setSchools(updatedSchools);
  };

  const handleRemoveDepartment = (schoolIndex, departmentIndex) => {
    const updatedSchools = [...schools];
    updatedSchools[schoolIndex].departments.splice(departmentIndex, 1);
    setSchools(updatedSchools);
  };

  const handleDeparmentChange = (schoolIndex, departmentIndex, value) => {
    const updatedSchools = [...schools];
    updatedSchools[schoolIndex].departments[departmentIndex].name = value;
    setSchools(updatedSchools);
  };

  const handleAddCourse = (schoolIndex, departmentIndex) => {
    const updatedSchools = [...schools];
    updatedSchools[schoolIndex].departments[departmentIndex].courses.push({
      name: "",
      feeStructureLink: "",
    });
    setSchools(updatedSchools);
  };

  const handleRemoveCourse = (schoolIndex, departmentIndex, courseIndex) => {
    const updatedSchools = [...schools];
    updatedSchools[schoolIndex].departments[departmentIndex].courses.splice(
      courseIndex,
      1
    );
    setSchools(updatedSchools);
  };

  const handleCourseChange = (
    schoolIndex,
    departmentIndex,
    courseIndex,
    field,
    value
  ) => {
    const updatedSchools = [...schools];
    updatedSchools[schoolIndex].departments[departmentIndex].courses[
      courseIndex
    ][field] = value;
    setSchools(updatedSchools);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const universitiesRef = ref(database, "universities/");
      const newUniversity = {
        name: name,
        location: location,
        description: description,
        image: imageLink,
        programs: programs,
      };
      if (!name || !imageLink || !description || !schools) {
        setError("Please fill in all fields.");
        return;
      }
      setLoading(true);

      if (editingUniversityId) {
        await set(
          ref(database, `universities/${editingUniversityId}`),
          newUniversity
        );

        setLoading(false);
        setEditingUniversityId(null);

        setName("");
        setLocation("");
        setImageLink("");
        setSchools([]);
        setDescription("");
      } else {
        await push(universitiesRef, newUniversity);

        setLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="justify-center">
      {error && <div className="text-red-500 mb-4 mt-7">{error}</div>}

      <h4 className="text-xl font-semibold mb-4">Programs:</h4>

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

      {/* Input fields for schools */}
      <div>
        <h4 className="text-xl font-semibold mb-4">Schools:</h4>
        {schools.map((school, schoolIndex) => (
          <div key={schoolIndex}>
            <InputField
              label={"School"}
              type="text"
              value={school.name}
              onChange={(e) => handleSchoolsChange(schoolIndex, e.target.value)}
            />

            {/* Input fields for schools */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Departments:</h5>
              {school.departments &&
                school.departments.map((department, departmentIndex) => (
                  <div key={schoolIndex}>
                    <InputField
                      label={"Department"}
                      type="text"
                      value={department.name}
                      onChange={(e) =>
                        handleDeparmentChange(
                          schoolIndex,
                          departmentIndex,
                          e.target.value
                        )
                      }
                    />

                    {/* Input fields for courses */}
                    <div>
                      <h6 className="text-md font-semibold mb-2">Courses:</h6>
                      {department.courses.map((course, courseIndex) => (
                        <div key={courseIndex}>
                          <InputField
                            label={"Course Name"}
                            type="text"
                            value={course.name}
                            onChange={(e) =>
                              handleCourseChange(
                                schoolIndex,
                                departmentIndex,
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
                                schoolIndex,
                                departmentIndex,
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
                                schoolIndex,
                                departmentIndex,
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
                          handleAddCourse(schoolIndex, departmentIndex)
                        }
                      >
                        Add Course
                      </button>
                    </div>

                    <button
                      type="button"
                      className="relative text-sm transition duration-300 text-red-500 bg-black rounded-md px-3 py-1 mt-3"
                      onClick={() =>
                        handleRemoveDepartment(schoolIndex, departmentIndex)
                      }
                    >
                      Remove Department
                    </button>
                  </div>
                ))}
              <button
                type="button"
                className="relative text-sm transition duration-300 text-green-400 bg-black rounded-md px-3 py-1 mt-3"
                onClick={() => handleAddDepartment(schoolIndex)}
              >
                Add Department
              </button>
            </div>

            <button
              type="button"
              className="relative text-sm transition duration-300 text-red-500 bg-black rounded-md px-3 py-1 mt-3"
              onClick={() => handleRemoveSchool(schoolIndex)}
            >
              Remove School
            </button>
          </div>
        ))}
        <button
          type="button"
          className="relative text-sm transition duration-300 text-green-400 bg-black rounded-md px-3 py-1 mt-3"
          onClick={handleAddschools}
        >
          Add School
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
