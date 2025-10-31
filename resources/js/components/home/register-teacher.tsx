import React from "react";

export default function BecomeTeacherSection() {
  return (
    <section className="py-20">
      <div className="max-w-8xl mx-auto px-12">
        <div className="rounded-lg overflow-hidden flex flex-col lg:flex-row items-stretch bg-white shadow-md min-h-[420px]">
          {/* === Left: Text Content === */}
          <div className="w-full lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Interested in becoming a Teacher at Ajar?
              <br />
              <span className="text-[#3ABEFF]">Register now!</span>
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed max-w-3xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nisi
              suscipit cupiditate ipsam dignissimos. Nam, neque. Animi doloremque
              veritatis delectus nostrum molestiae quam libero placeat
              accusantium rerum ratione! Repellat, nisi.
            </p>

            <button
              className="inline-block bg-[#3ABEFF] text-white font-semibold text-md px-6 py-3 rounded-md shadow-md 
              hover:bg-[#2ea5d3] transition-all duration-300 max-w-1/8"
            >
              Register
            </button>
          </div>

          {/* === Right === */}
          <div className="hidden lg:block w-full lg:w-1/3 relative">
            <img
              src="/images/regis-teacher.jpg"
              alt="Apply as a Teacher"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-white/70 via-white/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
