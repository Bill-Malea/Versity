/* eslint-disable @next/next/no-img-element */
import React from 'react';
const VersityCard = ({ event }) => {
  return (
    <div className="bg-white p-4 rounded-lg cursor-pointer ">
      <img src={event.image}  alt={event.title} className="sm:w-auto lg:w-64 h-36 object-cover mb-4 rounded-md" />
      <h3 className="text-sm font-semibold mb-2">{event.title}</h3>
       <div className="flex items-center mb-2">
           <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-black mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" />
            </svg>
            <p className="text-gray-600">{event.location}</p>
          </div>
      <p className="text-gray-600">{event.date}</p>
    </div>
  );
};

export default VersityCard;
