/* eslint-disable @next/next/no-img-element */
import React from 'react';

const NewsTab = ({ news }) => {
  return (
    <div className='lg:mx-10'>
      <h2 className="text-xl font-semibold mb-4">Latest News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-36 object-cover mb-4 rounded-t-md"
            />
            <div>
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-800">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTab;
