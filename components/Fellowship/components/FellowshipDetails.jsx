/* eslint-disable @next/next/no-img-element */
import React from "react";

const FellowshipDetails = ({ fellowship }) => {
  return (
    <div className="lg:mx-40 mx-5 my-5">
      <h2 className="text-3xl font-semibold mb-4">{fellowship.title}</h2>
      <img
        src={fellowship.image}
        alt={fellowship.title}
        className="w-full lg:h-80 h-48 object-cover mb-4 rounded-md"
      />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <div dangerouslySetInnerHTML={{ __html: fellowship.content }} />
      </div>

      <button className="bg-black border-gray-300 text-green-500 px-8 py-1 rounded-md mt-5 cursor-pointer">
        Visit
      </button>
    </div>
  );
};

export default FellowshipDetails;
