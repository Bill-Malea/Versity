import React from 'react';
import ScholarshipList from './components/ScholarshipList';

const ScholarshipPage = () => {
  // Sample scholarship data
  const scholarships = [
    {
      title: 'Scholarship 1',
      image: 'https://visareservation.com/wp-content/uploads/2023/09/Scholarship-Award.png',
      description: 'Description for Scholarship 1.',
    },
    {
      title: 'Scholarship 2',
      image: 'https://visareservation.com/wp-content/uploads/2023/09/Scholarship-Award.png',
      description: 'Description for Scholarship 2.',
    },

    {
      title: 'Scholarship 3',
      image: 'https://www.meiji.ac.jp/cip/english/admissions/co7mm900000007pv-img/incentivescholarship2.png',
      description: 'Description for Scholarship 1.',
    },
    {
      title: 'Scholarship 4',
      image: 'https://www.shutterstock.com/image-vector/scholarship-edu-investment-dollar-coin-260nw-1772926595.jpg',
      description: 'Description for Scholarship 2.',
    },

     {
      title: 'Scholarship 5',
      image: 'https://www.shutterstock.com/image-vector/scholarship-edu-investment-dollar-coin-260nw-1772926595.jpg',
      description: 'Description for Scholarship 2.',
    },
     {
      title: 'Scholarship 6',
      image: 'https://www.shutterstock.com/image-vector/scholarship-edu-investment-dollar-coin-260nw-1772926595.jpg',
      description: 'Description for Scholarship 2.',
    },
   
  ];

  return (
    <div className=' lg:mx-10'>
      <h2 className="text-xl font-semibold mb-4">Scholarship  Programs</h2>
      <ScholarshipList scholarships={scholarships} />
    </div>
  );
};

export default ScholarshipPage;
