/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const VersityDetails = ({ versity }) => {
  return (
    <div className="lg:ml-36 px-20 py-10">
      <div className="flex flex-col w-full lg:flex-row">
        <img
          src={versity.image}
          alt={versity.name}
          className="w-full h-64 object-contain mb-4 rounded-md lg:w-1/2 lg:mr-10"
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
