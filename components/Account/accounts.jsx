/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import UniversityTab from "./componets/UniversityEdit";
import FellowshipTab from "./componets/FellowshipTab";
import ScholarshipTab from "./componets/ScholarshipsTab";
import NewsTab from "./componets/NewsTab";
import BlogTab from "./componets/BlogTab";
const AccountPage = () => {
  const [subTab, setSubTab] = useState("university");

  const handleSubTabClick = (tab) => {
    setSubTab(tab);
  };

  return (
    <div className="bg-white text-black h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center text-black p-4 mb-5">
          <h2 className="lg:text-2xl font-semibold  flex-grow">Account Page</h2>
          <h2 className=" font-semibold  mx-4">
            {" "}
            Welcome, <span className="text-l ">Bill</span>
          </h2>
          <h2 className="text-l  flex flex-row cursor-pointer   ">
            Log Out
            <span className="ml-2 ">
              <img
                src="assets/images/logout.svg"
                alt="Logout Icon"
                className="w-4 h-4 mr-4"
                onClick={null}
              />
            </span>
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className=" sm:flex-row sm:w-28 lg:w-60 text-left pr-4 mb-4 lg:mb-0 lg:mr-20">
            <div className="mb-4 flex sm:flex-row lg:flex-col">
              {[
                "university",
                "fellowship",
                "scholarship",
                "news",
                "blog",
                "banner",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`w-full p-3 rounded-md ${
                    subTab === tab
                      ? "bg-black text-green-400"
                      : "hover:bg-green-400 text-black"
                  }`}
                  onClick={() => handleSubTabClick(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {subTab === tab && <div className="active-tab-marker"></div>}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-3/4 ">
            {subTab === "university" && <UniversityTab />}
            {subTab === "fellowship" && <FellowshipTab />}
            {subTab === "scholarship" && <ScholarshipTab />}
            {subTab === "news" && <NewsTab />}
            {subTab === "blog" && <BlogTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
