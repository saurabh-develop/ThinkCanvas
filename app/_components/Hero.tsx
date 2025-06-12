"use client";
import React from "react";

interface HeroProps {
  theme: string;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  return (
    <>
      <div className="text-center py-40 px-30">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white">
          Documents & diagrams for <br />
          <span className="text-indigo-600">engineering</span> teams.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          All in one markdown editor, collaborative canvas, and <br />
          diagram-as-code builder
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow">
            Get Started
          </button>
          <button className="bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg shadow border border-gray-200 hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
