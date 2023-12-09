import React from 'react';
import BlogFeaturedPosts from './components/FeaturedBlog';
import BlogRecentPosts from './components/RecentBlogs';
const BlogPage = () => {
  
  const featuredPosts = [
    {
      title: 'Featured Post 1',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZXqPvbSBurH57hW0G5rd9nyq-bQ0NZuz1Hw&usqp=CAU',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Featured Post 2',
      image: 'https://assets-global.website-files.com/60ef088dd8fef99352abb434/64502c47934b682e375a0876_AnyConv.com__Artificial%20Intelligence%20Blog%20Writing%20Using%20AI%20in%2060%20Minutes.webp',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },

     {
      title: 'Featured Post 3',
      image: 'https://www.immunebytes.com/blog/wp-content/uploads/2023/03/What-are-hierarchical-deterministic-HD-crypto-wallets-1.1-min.png',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },

     {
      title: 'Featured Post 4',
      image: 'https://margaretbourne.com/wp-content/uploads/2022/06/July-Blog-Post-Ideas.jpg',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  const recentPosts = [
    {
      title: 'Blog Post 1',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb09tBoarPfY9ewHXAA6teB6_FY0-ItqcIpQ&usqp=CAU',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    {
      title: 'Blog Post 2',
      image: 'https://cryptoapis.io/images/B7uMpkQpqFCHNUS4VFn427bJZuRgKOnWQ5sGNJJD-1000x500.png',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    },
   
  ];

  return (
    <div className='lg:mx-10'>
      <BlogFeaturedPosts featuredPosts={featuredPosts} />
      <BlogRecentPosts recentPosts={recentPosts} />
    </div>
  );
};

export default BlogPage;
