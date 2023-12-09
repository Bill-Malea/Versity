/* eslint-disable @next/next/no-img-element */
import React from 'react';

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 transform hover:shadow-lg hover:-translate-y-1">
      <img
        src={scholarship.image}
        alt={scholarship.title}
        className="w-full h-36 object-cover mb-4 rounded-t-md"
      />
      <div>
        <h3 className="text-md font-semibold mb-2">{scholarship.title}</h3>
        <p className="text-gray-800">{scholarship.description}</p>
        <button
              key={scholarship.image}
              className={`relative  text-sm transition duration-300 text-green-400 bg-black   rounded-md px-7 py-1 mt-5`}
              onClick={null}
            >
            
         Visit
            </button>
      </div>
    </div>
  );
};

export default ScholarshipCard;
