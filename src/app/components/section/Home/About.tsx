import React from "react";

const About = () => {
  return (
    <div className="relative h-screen bg-gray-900 text-white">
      {/* Content container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">About Me</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            This is the about section content. You can add your bio, skills,
            experience, and other information here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
