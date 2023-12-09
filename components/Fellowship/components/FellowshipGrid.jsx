import React from 'react';
import FellowshipCard from './FellowshipCard';

const FellowshipList = ({ fellowships }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {fellowships.map((fellowship, index) => (
        <FellowshipCard key={index} fellowship={fellowship} />
      ))}
    </div>
  );
};

export default FellowshipList;
