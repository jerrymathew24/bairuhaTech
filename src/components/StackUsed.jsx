"use client";
import React from "react";
import { Laptop, Database, Cloud, Smartphone } from "lucide-react";

export default function StackComponent() {
  const stackCategories = [
    {
      title: "Frontend",
      icon: <Laptop size={40} strokeWidth={1.5} />,
      items: ["Angular", "React", "Javascript", "Typescript"],
    },
    {
      title: "Backend",
      icon: <Database size={40} strokeWidth={1.5} />,
      items: [ "Python", ".NET", "PHP", "Node"],
    },
    {
      title: "DevOps",
      icon: <Cloud size={40} strokeWidth={1.5} />,
      items: ["AWS", "Microsoft Azure", "Google Cloud Platform", "Kubernetes"],
    },
    {
      title: "Mobile",
      icon: <Smartphone size={40} strokeWidth={1.5} />,
      items: ["Android (Java, Kotlin)", "iOS (Swift, Objective-C)", "React Native", "Flutter"],
    },
  ];

  // Uniform colors
  const cardBg = "bg-blue-950";
  const iconColor = "text-sky-300";
  const titleColor = "text-white";

  return (
    <div className="text-center p-4 py-16 bg-gray-50 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-800">
      {/* Heading */}
      <div className="mb-10 sm:mb-14 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Stack We Are Using
        </h2>
        <p className="text-sm sm:text-base text-gray-100 max-w-2xl mx-auto leading-relaxed">
          At MResources, we love technology. If your favourite tech stack is listed here, feel free
          to contact us for your contracting needs. We (probably) have the right match for you.
        </p>
      </div>

      {/* Stack Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {stackCategories.map((category, index) => (
          <div
            key={index}
            className={`w-full sm:w-64 max-w-sm rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105`}
            style={{ minHeight: "300px" }} // fixed height
          >
            {/* Top Section */}
            <div
              className={`p-6 flex flex-col items-center justify-center ${cardBg}`}
              style={{ minHeight: "150px" }} // fixed top section height
            >
              <div
                className={`p-4 rounded-full bg-white flex items-center justify-center shadow-md ${iconColor}`}
              >
                {category.icon}
              </div>
              <h3 className={`mt-4 text-xl font-semibold ${titleColor}`}>
                {category.title}
              </h3>
            </div>

            {/* Bottom Section with List */}
            <div className="p-6 bg-white text-left flex-1">
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                {category.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
