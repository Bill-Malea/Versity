import React from "react";
import BannerSlider from "./components/Banner";
import VersityCard from "./components/VarsityCard";

const Versities = ({ versityList, Banners }) => {
  return (
    <div className="container ">
      <BannerSlider />
      <div className="lg:ml-10 sm:ml mt-5">
        <h2 className="text-xl font-semibold lg:mb-4 sm:ml-4">Universities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {versityList.map((event, index) => (
            <VersityCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Versities;
