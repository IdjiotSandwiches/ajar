import React from "react";

export default function HeroSection() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-12 bg-white cursor-default">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3ABEFF] leading-snug">
          Learning, Teaching <br /> Technology and Design
        </h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate id, necessitatibus obcaecati incidunt eos soluta nesciunt molestiae excepturi dolorem quibusdam porro at quas deleniti, explicabo veniam aut dolorum numquam. Dolor, eveniet voluptatum neque saepe nostrum itaque at! Esse optio eaque nisi quaerat dolor sapiente? Error esse ex commodi adipisci distinctio. 
        </p>
        <div className="flex w-full max-w-md bg-[#42C2FF]/50 rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search Course"
            className="flex-1 px-4 py-3 outline-none text-white font-medium"
          />
          <button className="bg-[#3ABEFF] text-white px-6 py-2 font-medium hover:bg-[#2aa2dd] cursor-pointer">
            Search
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/images/hero-img.png"
          alt="Hero"
          className="rounded-full w-100 h-100 object-cover"
        />
      </div>
    </section>
  );
}
