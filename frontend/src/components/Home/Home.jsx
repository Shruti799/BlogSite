import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";

const Home = () => {
  return (
    <section className="overflow-hidden pb-24">
      <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
      </div>
      <div className="container px-4 mx-auto relative">
        <div className="relative z-20">
          <h1 className="text-center text-5xl lg:text-7xl font-bold font-heading mb-6 mt-14 max-w-2xl mx-auto">
            <span>Unlock Strength of</span>
            <span className="block text-purple-600">Collective Knowledge</span>
          </h1>
          <p className="text-center text-lg mb-10 max-w-lg mx-auto">
          Learn and grow together. Connect, share, and explore ideas with like-minded learners.
          </p>
          <div className="flex flex-col items-center space-y-20 lg:pb-56">
            <Link
              to="/register"
              className="w-full sm:w-auto h-16 inline-flex items-center justify-center text-center py-4 px-6 rounded-full bg-purple-600 border border-purple-700 shadow font-bold font-heading text-white hover:bg-purple-800 focus:ring focus:ring-blue-200 transition duration-200"
            >
              Get Started
            </Link>

            <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-20 transition-opacity duration-300" style={{
              backgroundImage: 'url("/books.jpg")',
            }} />

            <div className="mt-6 flex flex-col items-center">
              <p className="text-gray-700 text-sm">
                Developed by{" "}
                <a
                  href="https://x.com/Shruti_Aug2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold hover:underline"
                >
                  Shruti
                </a>
              </p>

              {/* Twitter Link with Icon (Reduced spacing between them) */}
              <a
                href="https://x.com/Shruti_Aug2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-black font-semibold hover:underline mt-1"
              >
                <FaTwitter className="text-xl" /> {/* Twitter Icon */}
                <span>Twitter</span>
              </a>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Home;
