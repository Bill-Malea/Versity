/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
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
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <div dangerouslySetInnerHTML={{ __html: scholarship.content }} />
      </div>

      <button className="bg-black border-gray-300 text-green-500 px-8 py-1 rounded-md mt-5 cursor-pointer">
        Visit
      </button>
    </div>
  );
};

export default ScholarshipDetails;
