import React, { useState } from 'react';
import NavBar from './Navbar/Navbar';
import Versities from './Events/Versity';
import Footer from './Footer/Footer';
import FellowshipPage from './Fellowship/Fellowship';
import ScholarshipPage from './Scholarship/Scholarship';
import NewsPage from './News/News';
import BlogPage from './Blog/Blog';
import BlogDescriptionPage from './Blog/components/BlogDescription';
import LoginPage from './Login/Login';
import AccountPage from './Account/accounts';
const Layout = () => {

  const [activeTab, setActiveTab] = useState('university');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
    
      case 'fellowship':
        return <FellowshipPage/>;
      case 'scholarship':
        return <ScholarshipPage/>;
      case 'news':
        return <NewsPage/>;
      case 'blog':
        return <BlogPage/>; 
      case 'about':
        return <BlogDescriptionPage/>;
      default :"university"
        return <AccountPage/>;
    }
  };

  return (
    <div>
      <NavBar onTabClick={handleTabClick} activeTab={activeTab} />
      <div className="mt-20 mb-56 lg">
        {renderContent()}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
