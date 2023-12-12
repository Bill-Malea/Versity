/* eslint-disable @next/next/no-img-element */
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white p-8 rounded-md">
      <div className="container ">
        {/* Subscribe Section */}
        <div className="mb-8 text-left">
          <h3 className="text-xl font-semibold mb-2">
            Subscribe to Our Newsletter
          </h3>

          <p className="text-gray-300 mb-4">
            Get the latest updates and news straight to your inbox.
          </p>

          <div className="flex items-center justify-start space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 border rounded-md focus:outline-none w-96 text-black "
            />
            <button className="bg-green-500 text-black px-2 py-2 rounded-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* Join Us Section */}

        <div>
          <h3 className="text-xl font-semibold mb-2">Join Us</h3>
          <div className="flex items-center space-x-4 bg-black">
            <a href="#" className="hover:text-blue-500">
              <img
                src="/assets/images/fb.png"
                alt="Facebook"
                className="h-10 w-10 bg-black"
              />
            </a>
            <a href="#" className="hover:text-blue-500">
              <img
                src="/assets/images/x.png"
                alt="Twitter"
                className="h-10 w-10"
              />
            </a>
            <a href="#" className="hover:text-blue-500">
              <img
                src="/assets/images/insta.png"
                alt="Instagram"
                className="h-10 w-10"
              />
            </a>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-2">Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
