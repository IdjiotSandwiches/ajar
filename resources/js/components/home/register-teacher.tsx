import { router } from "@inertiajs/react";
import React from "react";

export default function BecomeTeacherSection() {
  return (
    <section className="pt-4 pb-8 md:pt-8 md:pb-16 px-4 sm:px-6 md:px-12 bg-white">
      <div className="w-full">
        <div className="rounded-lg overflow-hidden flex flex-col lg:flex-row items-stretch bg-white shadow-md min-h-[320px]">
          <div className="w-full lg:w-2/3 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center gap-y-3">
            <h2 className="font-bold text-gray-800 mb-4 text-2xl sm:text-2xl md:text-2xl lg:text-3xl">
              Interested in becoming a Teacher at Ajar?
              <br />
              <span className="text-[#3ABEFF]">Register now!</span>
            </h2>

            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-4xl text-sm sm:text-base md:text-sm lg:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nisi
              suscipit cupiditate ipsam dignissimos. Nam, neque. Animi doloremque
              veritatis delectus nostrum molestiae quam libero placeat
              accusantium rerum ratione! Repellat, nisi.
            </p>

            <button
              className="inline-block bg-[#42C2FF] text-white font-semibold px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-md shadow-md hover:bg-[#42C2FF]/90 transition-all duration-300 w-fit text-sm sm:text-base"
              onClick={() => router.get(route("register.teacher"))}
            >
              Register
            </button>
          </div>

          <div className="hidden lg:block w-full lg:w-1/3 relative">
            <img
              src="/images/regis-teacher.jpg"
              alt="Apply as a Teacher"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white/70 via-white/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
