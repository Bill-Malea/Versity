/* eslint-disable @next/next/no-img-element */
import React from "react";

const FellowshipDetails = ({ fellowship }) => {
  return (
    <div className="lg:mx-40 mx-5 my-5">
      <h2 className="text-3xl font-semibold mb-4">{fellowship.title}</h2>
      <img
        src={fellowship.image}
        alt={fellowship.title}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Content</h2>
        <div dangerouslySetInnerHTML={{ __html: fellowship.content }} />
      </div>
    </div>
  );
};

export default FellowshipDetails;
