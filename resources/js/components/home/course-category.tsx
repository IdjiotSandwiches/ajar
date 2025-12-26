import { router } from "@inertiajs/react";

export default function TechDesignCourseSection() {
  const goToList = (category_id: 1 | 2) => {
    router.get(route("list-course"), { category_id });
  };


  return (
    <section className="pt-8 pb-4 md:pt-16 md:pb-8 px-4 sm:px-6 md:px-12 bg-white dark:bg-[#222831]">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-6 border rounded-lg shadow-sm bg-[#3ABEFF]/5 dark:shadow-[#ffffff]/20">
          <h4 className="text-[#3ABEFF] font-semibold mb-2">Technology Course</h4>
          <p className="font-medium mb-2">
            Learn Technology to improve your skills in the modern era
          </p>
          <p className="text-sm text-gray-600 dark:text-white/80 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>

          <button
            onClick={() => goToList(1)}
            className="text-sm text-[#3ABEFF] font-medium hover:underline"
          >
            Furthermore...
          </button>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-[#3ABEFF]/5 dark:shadow-[#ffffff]/20">
          <h4 className="text-[#3ABEFF] font-semibold mb-2">Design Course</h4>
          <p className="font-medium mb-2">
            Learn Design to improve your designing skills
          </p>
          <p className="text-sm text-gray-600 dark:text-white/80 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>

          <button
            onClick={() => goToList(2)}
            className="text-sm text-[#3ABEFF] font-medium hover:underline"
          >
            Furthermore...
          </button>
        </div>
      </div>
    </section>
  );
}
