/* eslint-disable @next/next/no-img-element */
import React from "react";

const VersityDetails = ({ versity }) => {
  return (
    <div className="lg:mx-40 mx-5 my-10">
      {/*  */}
      <div className="flex  sm:flex-col lg:flex-row  w-full">
        <img
          src={versity.image}
          alt={versity.title}
          className="w-1/2 h-96 object-cover mb-4 rounded-md mr-10"
        />

        <div>
          <h2 className="text-3xl w-full font-semibold mb-4">
            {versity.title}
          </h2>

          <div className="mt-5s">{versity.description}</div>
        </div>
      </div>

      {/* FILTER */}

      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Departments</h2>
      </div>

      {/*  */}
    </div>
  );
};

export default VersityDetails;
