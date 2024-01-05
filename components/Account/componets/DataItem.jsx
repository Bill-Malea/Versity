import React from "react";

const DataItem = ({ title, image, content, onEditClick, onDeleteClick }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-3">
      <div className=" lg:w-96">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-gray-500 ">{content}</p>
        <p className="text-gray-500">{image}</p>
      </div>
      <div className="space-x-4">
        <button
          className={`relative  text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black   rounded-md px-5 py-1 mt-5`}
          onClick={onEditClick}
        >
          Edit
        </button>
        <button
          className={`relative  text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black   rounded-md px-5 py-1 mt-5`}
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DataItem;
