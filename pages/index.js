import React, { useState } from "react";
import { router } from "next/router";
import {
  FellowshipPage,
  BlogDescriptionPage,
  AboutPage,
  BlogPage,
  ScholarshipPage,
  NavBar,
  Footer,
  NewsPage,
  Versities,
} from "@/components";
import {
  getUniversities,
  getBanners,
  getFellowships,
  getScholarships,
  getNews,
  getCollages,
  getBlogs,
} from "@/pages/api/firebase";

export async function getStaticProps() {
  const universities = await getUniversities();
  const collages = await getCollages();
  const fellowships = await getFellowships();
  const scholarships = await getScholarships();
  const newsArticles = await getNews();
  const blogs = await getBlogs();
  const banners = await getBanners();

  return {
    props: {
      universities,
      collages,
      fellowships,
      scholarships,
      newsArticles,
      blogs,
      banners,
    },
    revalidate: 60 * 60, // Re-generate every 1 hour
  };
}

export default function Home({
  universities,
  collages,
  fellowships,
  scholarships,
  newsArticles,
  blogs,
  banners,
}) {
  const [activeTab, setActiveTab] = useState("university");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "fellowship":
        return <FellowshipPage fellowships={fellowships} />;

      case "scholarship & Opportunities":
        return <ScholarshipPage scholarships={scholarships} />;
      case "events":
        return <NewsPage newsArticles={newsArticles} />;
      case "blog":
        return <BlogPage blogs={blogs} />;
      case "about":
        return <AboutPage blogs={blogs} />;

      default:
        return (
          <Versities
            versityList={universities}
            banners={banners}
            collages={collages}
          />
        );
    }
  };

  return (
    <main className={`flex min-h-screen flex-col`}>
      <NavBar onTabClick={handleTabClick} activeTab={activeTab} />
      <div className="mb-56 lg:px-8 sm:px-2 py-20 ">{renderContent()}</div>
      <Footer />
    </main>
  );
}
