/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import React from "react";

const FellowshipDetails = ({ fellowship }) => {
  function openLink() {}
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
        <div className="flex flex-row mb-5">
          <h2 className="text-l font-semibold mr-5 flex-1">
            Deadline: {format(fellowship.deadline, "PP")}
          </h2>
          <button
            onClick={() => window.open(fellowship.fellowshipUrl, "_blank")}
            className="bg-black border-gray-300 text-green-500 px-8 py-1 rounded-md  cursor-pointer"
          >
            Visit
          </button>
        </div>
        <div
          className=" font-roboto text-lg   mb-4"
          dangerouslySetInnerHTML={{ __html: fellowship.content }}
        />
      </div>
    </div>
  );
};

export default FellowshipDetails;
