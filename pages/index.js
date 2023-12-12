import React, { useState } from "react";
import {
  FellowshipPage,
  BlogDescriptionPage,
  BlogPage,
  ScholarshipPage,
  NavBar,
  Footer,
  NewsPage,
  Versities,
} from "@/components";
import {
  getUniversities,
  getFellowships,
  getScholarships,
  getNews,
  getBlogs,
} from "@/pages/api/firebase";

export async function getStaticProps() {
  const universities = await getUniversities();
  const fellowships = await getFellowships();
  const scholarships = await getScholarships();
  const newsArticles = await getNews();
  const blogs = await getBlogs();

  return {
    props: {
      universities,
      fellowships,
      scholarships,
      newsArticles,
      blogs,
    },
    revalidate: 60 * 60, // Re-generate every 1 hour
  };
}

export default function Home({
  universities,
  fellowships,
  scholarships,
  newsArticles,
  blogs,
}) {
  const [activeTab, setActiveTab] = useState("university");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "fellowship":
        return <FellowshipPage fellowships={fellowships} />;
      case "scholarship":
        return <ScholarshipPage scholarships={scholarships} />;
      case "news":
        return <NewsPage newsArticles={newsArticles} />;
      case "blog":
        return <BlogPage blogs={blogs} />;
      case "about":
        return <BlogDescriptionPage />;
      default:
        return <Versities versityList={universities} />;
    }
  };

  return (
    <main className={`flex min-h-screen flex-col`}>
      <NavBar onTabClick={handleTabClick} activeTab={activeTab} />
      <div className="mb-56 lg px-8 py-20 ">{renderContent()}</div>
      <Footer />
    </main>
  );
}
