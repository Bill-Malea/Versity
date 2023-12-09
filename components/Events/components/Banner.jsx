/* eslint-disable @next/next/no-img-element */
import React from 'react';

const BannerSlider = () => {
  return (
    <div className="max-w-screen-lg sm:ml-0 lg:ml-10 mt-5 overflow-hidden rounded-lg shadow-md">
      <img
        src="https://img.freepik.com/free-vector/elegant-event-party-banner-with-black-splash_1361-2171.jpg?w=996&t=st=1702025704~exp=1702026304~hmac=865ae1e06371b3e6a87b5fca2bf91768ade73d63612aacea4c3b69184adb2fb5"
        alt="banner"
        className="rounded-lg w-full lg:h-96 sm:h-16 object-cover"
      />
    </div>
  );
};

export default BannerSlider;
