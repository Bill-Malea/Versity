/* eslint-disable @next/next/no-img-element */
import React from "react";

const VersityDetails = ({ versity }) => {
  return (
    <div className="lg:ml-36 lg:px-20 lg:py-10 p-5">
      <div className="flex flex-col lg:flex-row  sm:mb-10">
        <div className="flex flex-col lg:flex-col  lg:p-10 lg:mr-10">
          <img
            src={versity.image}
            alt={versity.name}
            className=" w-auto  h-36 object-contain mb-4 rounded-md  lg:h-72 s lg:mr-10"
          />

          <h2 className="lg:text-xl font-semibold mb-4">Best Course</h2>
          <h2 className="lg:text-l   font-semibold mb-4">
            {versity.bestCourse}
          </h2>
          <button
            onClick={() => window.open(versity.uniLink, "_blank")}
            className="bg-black w-32 mb-5 border-gray-300 text-green-500 px-8 py-1 rounded-md mt-5 cursor-pointer"
          >
            Visit
          </button>
        </div>
        <div className="lg:w-3/4">
          <h2 className="text-xl font-semibold  mb-4">{versity.name}</h2>
          <div className="mt-5 lg:h-80 lg:overflow-y-auto  ">
            {versity.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersityDetails;
