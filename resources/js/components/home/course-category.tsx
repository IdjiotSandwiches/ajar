import React from "react";

export default function TechDesignCourseSection() {
  return (
    <section className="pt-8 pb-16 px-6 md:px-12 bg-white">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-lg shadow-sm bg-[#3ABEFF]/5">
          <h4 className="text-[#3ABEFF] font-semibold mb-2">
            Technology Course
          </h4>
          <p className="font-medium mb-2">
            Learn Technology to improve your skills in the modern era
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia deserunt repudiandae dolores aut, incidunt odit voluptatum nihil mollitia, at omnis eveniet reiciendis maxime doloremque dolorem illo, alias distinctio voluptatibus accusantium cupiditate commodi veniam? Nihil dolores iste consequuntur quidem ab natus pariatur quam, repellat quibusdam quis rem? Itaque amet ipsam optio.
          </p>
          <button className="text-sm text-[#3ABEFF] font-medium hover:underline">
            Furthermore...
          </button>
        </div>

        <div className="p-6 border rounded-lg shadow-sm bg-[#3ABEFF]/5">
          <h4 className="text-[#3ABEFF] font-semibold mb-2">Design Course</h4>
          <p className="font-medium mb-2">
            Learn Design to improve your designing skills
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quas officia incidunt, voluptas sit iusto doloribus expedita delectus accusantium ad dolorum vero molestias, dignissimos corporis? Quibusdam incidunt magnam animi est beatae quasi dignissimos ratione quam molestias asperiores, libero, iure odit quod praesentium nisi! Optio ipsum aliquam vel eos et exercitationem provident asperiores ab velit, dolore odit nemo iure, perspiciatis error.
          </p>
          <button className="text-sm text-[#3ABEFF] font-medium hover:underline">
            Furthermore...
          </button>
        </div>
      </div>
    </section>
  );
}
