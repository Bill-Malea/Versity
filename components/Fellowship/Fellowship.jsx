import React from "react";
import FellowshipList from "./components/FellowshipGrid";

const FellowshipPage = ({ fellowships }) => {
  return (
    <div className=" lg:mx-16">
      <h2 className="text-2xl font-semibold mb-4">Fellowship Programs</h2>
      <FellowshipList fellowships={fellowships} />
    </div>
  );
};

export default FellowshipPage;
