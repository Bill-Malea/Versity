import React from 'react';
import ScholarshipCard from './ScholarshipCard';

const ScholarshipList = ({ scholarships }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {scholarships.map((scholarship, index) => (
        <ScholarshipCard key={index} scholarship={scholarship} />
      ))}
    </div>
  );
};

export default ScholarshipList;
