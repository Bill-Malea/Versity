/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const NavBar = ({ onTabClick, activeTab }) => {
  return (
    <nav className="bg-zodiac p-4 text-white fixed top-0  z-50  w-full shadow-md">
      <div className="container mx-auto flex items-start">
        {/* Logo Placeholder */}

        <div className="flex items-center">
          <div className="cursor-pointer">
            <Link href={"/account"}>
              <img
                src="assets/images/account.svg"
                alt="Account Icon"
                className="w-4 h-4 mr-4"
                onClick={null}
              />
            </Link>
          </div>

          <Link href={"/"}>
            <span className="text-2xl font-semibold">Your Logo</span>
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="ml-auto space-x-4 lg:space-x-8 lg:mr-10">
          {[
            "university",
            "fellowship",
            "scholarship",
            "news",
            "blog",
            "about",
          ].map((tab) => (
            <button
              key={tab}
              className={`relative transition duration-300 ${
                activeTab === tab
                  ? "text-white bg-black  rounded-lg py-2 px-3"
                  : "hover:text-white"
              }`}
              onClick={() => onTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && <div className="active-tab-marker"></div>}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
