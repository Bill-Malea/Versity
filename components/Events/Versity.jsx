import React, { useState } from "react";
import BannerSlider from "./components/Banner";
import VersityCard from "./components/VarsityCard";

const Versities = ({ versityList, Banners }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVersities = versityList.filter((versity) => {
    return (
      versity &&
      versity.name &&
      versity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto">
      <BannerSlider />

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
            <VersityCard key={index} versity={versity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Versities;
