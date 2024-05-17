/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "images.hivisasa.com",
      "nairobiwire.com",
      "img.freepik.com",
      "www.google.com",
    ],
  },
};

module.exports = nextConfig;
