import React, { useState } from "react";
import BannerSlider from "./components/Banner";
import VersityCard from "./components/VarsityCard";

const Versities = ({ versityList, banners, collages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCol, setSearchTermCol] = useState("");

  const filteredVersities = versityList.filter((versity) => {
    return (
      versity &&
      versity.name &&
      versity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredCollages = collages.filter((collage) => {
    return (
      collage &&
      collage.name &&
      collage.name.toLowerCase().includes(searchTermCol.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto">
      <BannerSlider images={banners} />

      <div className="lg:ml-10 sm:ml mt-5">
        <h2 className="text-2xl font-semibold lg:mb-4 sm:ml-4">Universities</h2>

        <input
          type="text"
          placeholder="Search for a university"
          className="border border-gray-300 rounded-sm p-2 mb-4 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredVersities.map((versity, index) => (
            <VersityCard key={index} versity={versity} isCollage={false} />
          ))}
        </div>
      </div>

      <div className="lg:ml-10 sm:ml mt-5">
        <h2 className="text-2xl font-semibold lg:mb-4 sm:ml-4">Collages</h2>

        <input
          type="text"
          placeholder="Search for a university"
          className="border border-gray-300 rounded-sm p-2 mb-4 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTermCol(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCollages.map((collages, index) => (
            <VersityCard key={index} versity={collages} isCollage={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Versities;
