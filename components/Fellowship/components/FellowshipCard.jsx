/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
const FellowshipCard = ({ fellowship }) => {
  return (
    <Link href={`/fellowship/${fellowship.id}`}>
      <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 transform hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <img
          src={fellowship.image}
          alt={fellowship.title}
          className="w-full h-36 object-contain mb-4 rounded-t-md"
        />
        <div>
          <h3 className="text-lg font-semibold mb-2">{fellowship.title}</h3>
          <p className="text-gray-800">{fellowship.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default FellowshipCard;
