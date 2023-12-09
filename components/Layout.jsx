import React, { useState } from 'react';
import NavBar from './Navbar/Navbar';
import Versities from './Events/Versity';
import Footer from './Footer/Footer';
import FellowshipPage from './Fellowship/Fellowship';
const Layout = () => {

  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
    
      case 'fellowship':
        return <FellowshipPage/>;
      case 'scholarship':
        return <div>Blog Content Goes Here</div>;
      case 'news':
        return <div>About Content Goes Here</div>;
      case 'blog':
        return <div>About Content Goes Here</div>; 
      case 'about':
        return <div>About Content Goes Here</div>;
      default :"university"
        return <Versities/>;
    }
  };

  return (
    <div>
      <NavBar onTabClick={handleTabClick} activeTab={activeTab} />
      <div className="mt-20">
        {renderContent()}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
