/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
const ScholarshipDetails = ({ scholarship }) => {
  return (
    <Link href={`/scholarship/${scholarship.id}`}>
      <div className="lg:mx-40 mx-5 my-5">
        <h2 className="text-3xl font-semibold mb-4">{scholarship.title}</h2>
        <img
          src={scholarship.image}
          alt={scholarship.title}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Content</h2>
          <div dangerouslySetInnerHTML={{ __html: scholarship.content }} />
        </div>
      </div>
    </Link>
  );
};

export default ScholarshipDetails;
