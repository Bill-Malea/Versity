import React from "react";
import ScholarshipList from "./components/ScholarshipList";

const ScholarshipPage = ({ scholarships }) => {
  return (
    <div className=" lg:mx-10">
      <h2 className="text-xl font-semibold mb-4">Scholarship Programs</h2>
      <ScholarshipList scholarships={scholarships} />
    </div>
  );
};

export default ScholarshipPage;
