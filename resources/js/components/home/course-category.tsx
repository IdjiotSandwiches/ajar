import { router } from "@inertiajs/react";

export default function TechDesignCourseSection() {
  const goToList = (category_id: 1 | 2) => {
    router.get(route("list-course"), { category_id });
  };

  return (
    <section className="pt-8 pb-4 md:pt-16 md:pb-8 px-4 sm:px-6 md:px-12 bg-white dark:bg-[#222831]">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Technology Course */}
        <div className="p-6 border rounded-lg shadow-sm bg-[#3ABEFF]/5 dark:shadow-[#ffffff]/20">
          <h4 className="text-[#3ABEFF] font-semibold mb-2">
            Technology Course
          </h4>
          <p className="font-medium mb-2">
            Learn Technology to improve your skills in the modern era
          </p>
          <p className="text-sm text-gray-600 dark:text-white/80 mb-4">
            Build strong technical foundations by learning directly from experienced
            instructors through live, scheduled classes. Technology courses on Ajar
            cover practical skills such as programming, software development, and
            modern digital tools, designed to help you understand concepts through
            real-time interaction. Each session is recorded, allowing you to revisit
            complex topics, reinforce your learning, and progress at your own pace
            while staying aligned with current industry needs.
          </p>

          <button
            onClick={() => goToList(1)}
            className="text-sm text-[#3ABEFF] font-medium hover:underline"
          >
            Explore Technology Courses
          </button>
        </div>

        {/* Design Course */}
        <div className="p-6 border rounded-lg shadow-sm bg-[#3ABEFF]/5 dark:shadow-[#ffffff]/20">
          <h4 className="text-[#3ABEFF] font-semibold mb-2">
            Design Course
          </h4>
          <p className="font-medium mb-2">
            Learn Design to improve your designing skills
          </p>
          <p className="text-sm text-gray-600 dark:text-white/80 mb-4">
            Enhance your creative and visual thinking through structured design
            courses delivered in live learning sessions. Design courses on Ajar focus
            on both creative process and practical execution, helping you develop
            skills in visual communication, layout, and digital design tools. With
            guided instruction and recorded sessions available for review, you can
            refine your design abilities, explore ideas confidently, and build a
            strong creative foundation.
          </p>

          <button
            onClick={() => goToList(2)}
            className="text-sm text-[#3ABEFF] font-medium hover:underline"
          >
            Explore Design Courses
          </button>
        </div>
      </div>
    </section>
  );
}
