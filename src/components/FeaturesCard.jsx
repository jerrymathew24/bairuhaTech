"use client";

import React from "react";

const features = [
  {
    icon: "https://cdn.pixabay.com/photo/2013/07/12/14/30/recycling-148349_1280.png",
    text: "Empowering Business through our Dedicated Resources",
    color: "bg-emerald-600",
  },
  {
    icon: "https://images.unsplash.com/photo-1643768479891-ea1066aadc6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0cmF0ZWd5JTIwaWNvbnN8ZW58MHx8MHx8fDA%3D",
    text: "Complex, Mission Critical Solutions Easy",
    color: "bg-blue-600",
  },
  {
    icon: "https://cdn.pixabay.com/photo/2023/05/20/08/12/robot-8006079_1280.png",
    text: "Hyper automation through Custom Workflows",
    color: "bg-amber-500",
  },
  {
    icon: "https://cdn.pixabay.com/photo/2016/03/31/15/17/achievement-1293132_1280.png",
    text: "10+ Years of Proven Customer Success",
    color: "bg-blue-600",
  },
];

export default function FeaturesCard() {
  return (
    <section className="text-center py-12 sm:py-16 bg-slate-50 relative">
      {/* Heading */}
      <div className="mb-10 sm:mb-14 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-3">
          The Features We Provide
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Since 2013 we are here to provide Powerful SaaS Solutions, IT
          Consultancy, and Staff Augmentation. Some of the main features are
          below.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="flex justify-center flex-wrap gap-6 px-4">
        {features.map((feature, index) => (
          <article
            key={index}
            className={`
              relative w-44 sm:w-52 h-44 sm:h-52 flex flex-col justify-end items-center text-center
              text-white transform transition-transform duration-300 hover:scale-105 shadow-lg ${feature.color}
            `}
          >
            {/* Hexagon Mask */}
            <div className="hexagon-mask w-full h-full flex flex-col justify-end items-center p-6 sm:p-8 rounded-lg overflow-hidden">
              {/* Icon Circle */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={feature.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>

              {/* Feature Text */}
              <p className="text-xs sm:text-base font-medium mt-12 sm:mt-14 px-2">
                {feature.text}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* GLOBAL SVG defs */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="roundedHex" clipPathUnits="objectBoundingBox">
            <path
              d="
                M0.25,0.04
                H0.75
                Q0.80,0.04,0.83,0.09
                L0.98,0.41
                Q1.00,0.45,0.98,0.50
                L0.83,0.91
                Q0.80,0.96,0.75,0.96
                H0.25
                Q0.20,0.96,0.17,0.91
                L0.02,0.50
                Q0.00,0.45,0.02,0.41
                L0.17,0.09
                Q0.20,0.04,0.25,0.04
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      {/* Global CSS so mask works */}
      <style jsx global>{`
        .hexagon-mask {
          clip-path: url(#roundedHex);
        }
      `}</style>
    </section>
  );
}
