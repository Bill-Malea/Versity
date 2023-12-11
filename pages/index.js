import { Inter } from "next/font/google";
import React, { useState } from "react";
import {
  FellowshipPage,
  BlogDescriptionPage,
  BlogPage,
  ScholarshipPage,
  NavBar,
  Footer,
  AuthPage,
  NewsPage,
} from "@/components";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ childre }) {
  const [activeTab, setActiveTab] = useState("university");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderContent = () => {
    switch (activeTab) {
      case "fellowship":
        return <FellowshipPage />;
      case "scholarship":
        return <ScholarshipPage />;
      case "news":
        return <NewsPage />;
      case "blog":
        return <BlogPage />;
      case "about":
        return <BlogDescriptionPage />;
      default:
        "university";
        return <AuthPage />;
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} `}
    >
      <NavBar onTabClick={handleTabClick} activeTab={activeTab} />
      <div className="mt-20 mb-56 lg">{renderContent()}</div>
      <Footer />
    </main>
  );
}
