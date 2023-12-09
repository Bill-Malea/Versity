import React from 'react';
import NewsTab from './components/NewsTab';

const NewsPage = () => {
  // Sample news data
  const newsArticles = [
    {
      title: 'Breaking News 1',
      image: 'https://www.shutterstock.com/image-photo/coaching-mentoring-concept-chart-keywords-260nw-761964574.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Latest Updates 2',
      image: 'https://img.freepik.com/premium-vector/mentoring-infographic-template-design-with-icons-vector-illustration-business-concept_549488-780.jpg',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
   
  ];

  return (
    <NewsTab news={newsArticles} />
  );
};

export default NewsPage;
