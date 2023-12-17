/* eslint-disable @next/next/no-img-element */
import React from "react";
import ImageCarousel from "@/components/Banner/ImageCarouser";
const BannerSlider = () => {
  return (
    <ImageCarousel
      images={[
        "https://pacificwest.hdsa.org/upload/fb-event-banners-23-.png",
        "https://img.freepik.com/free-vector/elegant-event-party-banner-with-black-splash_1361-2171.jpg?w=996&t=st=1702025704~exp=1702026304~hmac=865ae1e06371b3e6a87b5fca2bf91768ade73d63612aacea4c3b69184adb2fb5",
        "https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg",
      ]}
    />
  );
};

export default BannerSlider;
