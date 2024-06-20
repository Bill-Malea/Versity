/* eslint-disable @next/next/no-img-element */
import React from "react";
import { format } from "date-fns";
const ScholarshipDetails = ({ scholarship }) => {
  return (
    <div className="lg:mx-40 mx-5 my-5">
      <h2 className="text-3xl font-semibold mb-4">{scholarship.title}</h2>
      <img
        src={scholarship.image}
        alt={scholarship.title}
        className="w-full  lg:h-80 h-48 object-cover mb-4 rounded-md"
      />
      <div className="mt-8">
        <div className="flex flex-row mb-5">
          <h2 className="text-l font-semibold mr-5 flex-1">
            Deadline: {format(scholarship.deadline, "PP")}
          </h2>
        </div>

        <div dangerouslySetInnerHTML={{ __html: scholarship.content }} />
        <button
          onClick={() => window.open(scholarship.scholarshipUrl, "_blank")}
          className="bg-black border-gray-300 text-green-500 px-8 py-1 rounded-md  cursor-pointer"
        >
          APPLY HERE
        </button>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
