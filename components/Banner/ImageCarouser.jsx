/* eslint-disable @next/next/no-img-element */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="lg:ml-10">
          <img
            src={image.image}
            className="rounded-lg  lg:h-96  lg:w-5/6 sm:h-16 "
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
